const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const profileSchema = new mongoose.Schema({
    nickname: String,
    image: {
        type: String,
        default: 'default'
    }
}, {
    toJSON: {
        transform: (document, returnedObject) => {
            delete returnedObject._id; // Exclude _id field
        }
    }
})

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    profile: profileSchema
})

const postSchema = new mongoose.Schema({
    title: String,
    category: String,
    description: String,
    like: String,
    images: [String],
    comments: [String],
    tags: [String],
    author: String,
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const User = mongoose.model('User', userSchema)
const Post = mongoose.model('Post', postSchema)

module.exports = { User, Post }