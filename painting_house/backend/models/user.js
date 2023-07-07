const { Mongoose } = require('./mongooseConnection')

const profileSchema = new Mongoose.Schema({
    nickname: String,
    image: {
        type: String,
        default: 'default'
    }
}, {
    toJSON: {
        transform: function (document, returnedObject) {
            delete returnedObject._id; // Exclude _id field from the transformed object
        },
    }
})

const userSchema = new Mongoose.Schema({
    email: String,
    password: String,
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