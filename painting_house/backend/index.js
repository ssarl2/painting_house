require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bcrypt = require('bcrypt')
const app = express()
const { User } = require('./models/user')
const { Post } = require('./models/post')
const { Upload, GridfsBucket } = require('./models/gridfsBucket')
const { ObjectId } = require('mongodb')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    return response.status(400).send(error)
  }

  next(error)
}

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (request, response, next) => {
  const date = new Date()
  User.find({}).then(users => {
    const numberOfusers = users.length
    response.send(`<div>Painthouse has ${numberOfusers} users<br/><br/>${date}</div>`)
  })
    .catch(error => next(error))
})

app.get('/api/users', (request, response, next) => {
  User.find({}).then(users => {
    response.json(users)
  })
    .catch(error => next(error))
})

app.post('/api/users/profile', (request, response, next) => {
  const nickname = request.body.nickname

  User.find({ 'profile.nickname': nickname }).then(users => {
    response.json(users[0].profile.imageInfo)
  })
    .catch(error => next(error))
})

app.get('/api/users/:id', (request, response, next) => {
  User.findById(request.params.id)
    .then(user => {
      if (user) {
        response.json(user)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/users/:id', (request, response, next) => {
  User.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/users/:id', (request, response, next) => {
  const body = request.body

  User.findById(request.params.id)
    .then(notUpdatedUser => {
      const nuu = notUpdatedUser
      if (nuu) {

        const user = {
          email: body.email,
          password: !body.password ? nuu.password : body.password,
          profile: {
            nickname: !body.profile.nickname ? nuu.profile.nickname : body.profile.nickname,
            imageInfo: !body.profile.imageInfo ? nuu.profile.imageInfo : body.profile.imageInfo
          },
          postHistory: !body.postHistory ? nuu.postHistory : body.postHistory
        }

        User.findByIdAndUpdate(request.params.id, user, { new: true })
          .then(updatedUser => {
            response.json(updatedUser)
          })
          .catch(error => next(error))

      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/users', Upload.array('image'), async (request, response, next) => {
  const file = request.files[0]
  const imageInfo = { idInBucket: file.id.toString(), name: file.originalname, contentType: file.mimetype }
  const userObject = JSON.parse(request.body.userObject)

  const missing = []
  if (!userObject.email) {
    missing.push('email')
  }
  if (!userObject.password) {
    missing.push('password')
  }
  if (!userObject.profile.nickname) {
    missing.push('nickname')
  }
  if (!imageInfo) {
    missing.push('image')
  }

  if (missing.length > 0) {
    return response.status(400).json({
      error: `Missing ${missing.join(', ')}`
    })
  }

  await User.findOne({
    $or: [
      { email: userObject.email },
      { 'profile.nickname': userObject.profile.nickname }
    ]
  })
    .then(existingUser => {
      if (existingUser) {
        return response.status(400).json({
          error: 'Email or nickname already exists'
        })
      }
    })

  const plainPassword = userObject.password
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds)

  const tempProfileObject = userObject.profile
  tempProfileObject.imageInfo = imageInfo // and now it's handled here

  const user = new User({
    email: userObject.email,
    password: hashedPassword,
    profile: tempProfileObject,
    postHistory: [] // create with an empty history. Data will be filled with frontend data, but there is a template for this. Search 'postHistorySchema template'
  })

  user.save().then(savedUser => {
    response.json(savedUser)
  })
    .catch(error => next(error))
})

app.post('/api/login', async (request, response, next) => {
  const email = request.body.email
  const enteredPassword = request.body.password

  try {

    const user = await User.findOne({ email: email })

    if (!user) {
      throw new Error('Email not found')
    }

    const isMatch = await bcrypt.compare(enteredPassword, user.password)
    if (!isMatch) {
      throw new Error('Password does not match')
    }

    return response.json(user)

  } catch (error) {
    console.error('Login failed in backend', error)
  }
})

app.get('/api/posts', (request, response, next) => {
  Post.find({}).then(posts => {
    response.json(posts)
  })
    .catch(error => next(error))
})

app.get('/api/posts/:id', (request, response, next) => {
  Post.findById(request.params.id)
    .then(post => {
      if (post) {
        response.json(post)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.get('/api/images/:imageId', async (request, response, next) => {
  const imageId = request.params.imageId
  const objectId = new ObjectId(imageId)
  const gridfsBucket = await GridfsBucket()
  const readStream = gridfsBucket.openDownloadStream(objectId)
  readStream.pipe(response)
})

app.delete('/api/posts/:id', (request, response, next) => {
  Post.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/posts/:id', (request, response, next) => {
  const body = request.body

  Post.findById(request.params.id)
    .then(notUpdatedPost => {
      const nup = notUpdatedPost
      if (nup) {

        const post = {
          title: !body.title ? nup.title : body.title,
          category: !body.category ? nup.category : body.category,
          description: !body.description ? nup.description : body.description,
          like: !body.like ? nup.like : body.like,
          images: nup.images,
          comments: !body.comments ? nup.comments : body.comments,
          tags: !body.tags ? nup.tags : body.tags,
          author: nup.author
        }

        Post.findByIdAndUpdate(request.params.id, post, { new: true })
          .then(updatedPost => {
            response.json(updatedPost)
          })
          .catch(error => next(error))

      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.post('/api/posts', Upload.array('images'), (request, response, next) => {
  const imageInfos = []
  for (const file of request.files) {
    const image = {
      idInBucket: file.id.toString(),
      name: file.originalname,
      contentType: file.mimetype
    }
    imageInfos.push(image)
  }
  const postObject = JSON.parse(request.body.postObject)

  const missing = []
  if (!postObject.title) {
    missing.push('title')
  }
  if (!imageInfos[0]) {
    missing.push('images')
  }

  if (missing.length > 0) {
    return response.status(400).json({
      error: `Missing ${missing.join(', ')}`
    })
  }

  Post.findOne({ title: postObject.title })
    .then(existingTitle => {
      if (existingTitle) {
        return response.status(400).json({
          error: `The title '${postObject.title}' already exists`
        })
      }

      const post = new Post({
        title: postObject.title,
        category: postObject.category === "" ? "Normal" : postObject.category,
        description: postObject.description,
        like: "0",
        imageInfos: imageInfos, // and now it's handled here
        comments: postObject.comments,
        tags: postObject.tags ? postObject.tags : [],
        author: postObject.author
      })

      post.save().then(savedPost => {
        response.json(savedPost)
      })
        .catch(error => next(error))
    })
})

app.delete('/api/bucket/:id', async (request, response, next) => {
  const bucketId = request.params.id
  const gridfsBucket = await GridfsBucket()
  const objectId = new ObjectId(bucketId)
  gridfsBucket.delete(objectId)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})