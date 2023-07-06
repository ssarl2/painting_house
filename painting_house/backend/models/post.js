const { Mongoose } = require('./mongooseConnection')

const imageSchema = new Mongoose.Schema({
    images: {
        name: String,
        data: Buffer,
    }
})

const postSchema = new Mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: String,
    description: String,
    like: String,
    images: {
        type: [imageSchema],
        required: true
    },
    comments: [String],
    tags: [String],
    author: {
        type: String,
        required: true
    },
})

postSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Post = Mongoose.model('Post', postSchema)

module.exports = { Post }