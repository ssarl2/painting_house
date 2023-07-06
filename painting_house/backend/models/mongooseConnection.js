const Mongoose = require('mongoose')

Mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

Mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

module.exports = { Mongoose }
