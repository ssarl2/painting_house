const { Mongoose } = require('./mongooseConnection')
const { ImageSchema } = require('./image')

const profileSchema = new Mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    image: {
        type: [ImageSchema],
        required: true
    }
}, {
    toJSON: {
        transform: function (document, returnedObject) {
            delete returnedObject._id; // Exclude _id field from the transformed object
        },
    }
})

const userSchema = new Mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: profileSchema
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