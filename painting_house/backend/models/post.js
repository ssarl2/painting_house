const { Mongoose } = require('./mongooseConnection')
const { imageSchema } = require('./image')

const commentSchema = new Mongoose.Schema({
    commentor: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
        },
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
    comments: [commentSchema],
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