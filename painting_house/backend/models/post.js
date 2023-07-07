const { Mongoose } = require('./mongooseConnection')

const imageSchema = new Mongoose.Schema({
    name: String,
    data: Buffer,
    contentType: String
}, {
    toJSON: {
        transform: function (document, returnedObject) {
            delete returnedObject._id; // Exclude _id field from the transformed object
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