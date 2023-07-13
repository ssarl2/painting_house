require('dotenv').config()
const multer = require('multer')
const fs = require('fs');
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const { User } = require('./models/user')
const { Post } = require('./models/post')

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
          password: body.password === "" || body.password === undefined ? nuu.password : body.password,
          profile: {
            nickname: body.profile.nickname === "" || body.profile.nickname === undefined ? nuu.profile.nickname : body.profile.nickname,
            image: (body.profile.image === "" || body.profile.image === undefined) ? nuu.profile.image : body.profile.image
          }
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

app.post('/api/users', (request, response, next) => {
  const body = request.body

  const missing = []

  const e = body.email
  if (e === undefined || e === "") {
    missing.push('email')
  }

  const p = body.password
  if (p === undefined || p === "") {
    missing.push('password')
  }

  const n = body.profile.nickname
  if (n === undefined || n === "") {
    missing.push('nickname')
  }

  if (missing.length > 0) {
    return response.status(400).json({
      error: `Missing ${missing.join(', ')}`
    })
  }

  User.findOne({
    $or: [
      { email: body.email },
      { 'profile.nickname': body.profile.nickname }
    ]
  })
    .then(existingUser => {
      if (existingUser) {
        return response.status(400).json({
          error: 'Email or nickname already exists'
        })
      }

      const user = new User({
        email: body.email,
        password: body.password,
        profile: {
          nickname: body.profile.nickname,
          image: body.profile.image !== "" ? body.profile.image : 'default'
        }
      })

      user.save().then(savedUser => {
        response.json(savedUser)
      })
        .catch(error => next(error))
    })
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
          title: body.title === "" || body.title === undefined ? nup.title : body.title,
          category: body.category === "" || body.category === undefined ? nup.category : body.category,
          description: body.description === "" || body.description === undefined ? nup.description : body.description,
          like: body.like === "" || body.like === undefined ? nup.like : body.like,
          images: nup.images,
          comments: body.comments === "" || body.comments === undefined ? nup.comments : body.comments,
          tags: body.tags === "" || body.tags === undefined ? nup.tags : body.tags,
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

const upload = multer({ dest: 'uploads/' })
app.post('/api/posts', upload.array('images'), (request, response, next) => {
  const images = request.files
  const postObject = JSON.parse(request.body.postObject)

  const missing = []

  const t = postObject.title
  if (t === undefined || t === "") {
    missing.push('title')
  }

  const i = images
  if (i === undefined || i === "") {
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

      const imageBuffers = []
      for (const file of request.files) {
        const data = fs.readFileSync(file.path)
        const image = { name: file.originalname, data: data, contentType: file.mimetype }
        imageBuffers.push(image)
      }

      const post = new Post({
        title: postObject.title,
        category: postObject.category === "" ? "Normal" : postObject.category,
        description: postObject.description,
        like: "0",
        images: imageBuffers, // and now it's handled here
        comments: postObject.comments,
        tags: postObject.tags !== undefined ? postObject.tags : [],
        author: "implement login feature later"
      })

      post.save().then(savedPost => {
        response.json(savedPost)
      })
        .catch(error => next(error))
    })
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})