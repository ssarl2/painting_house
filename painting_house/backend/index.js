require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const { User, Post } = require('./models/schemas')

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
      if (notUpdatedUser) {

        const user = {
          email: body.email,
          password: body.password === "" || body.password === undefined ? notUpdatedUser.password : body.password,
          profile: {
            nickname: body.profile.nickname === "" || body.profile.nickname === undefined ? notUpdatedUser.profile.nickname : body.profile.nickname,
            image: (body.profile.image === "" || body.profile.image === undefined) ? notUpdatedUser.profile.image : body.profile.image
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

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})