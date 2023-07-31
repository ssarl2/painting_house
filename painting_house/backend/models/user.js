const { Mongoose } = require('./mongooseConnection')
const { imageSchema } = require('./image')

const profileSchema = new Mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    image: {
        type: imageSchema,
        required: true
    }
}, {
    toJSON: {
        transform: (document, returnedObject) => {
            delete returnedObject._id // Exclude _id field from the transformed object
        },
    }
})

/**
 * postHistorySchema template
 */
// const postHistorySchema = new Mongoose.Schema({
//     postId: String,
//     liked: Boolean,
//     comments: [String]
// })

const userSchema = new Mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: profileSchema,
    postHistory: [],
    // postHistory: [postHistorySchema] leaving as a template
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const User = Mongoose.model('User', userSchema)

module.exports = { User }