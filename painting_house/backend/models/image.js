const { Mongoose } = require('./mongooseConnection')

const ImageSchema = new Mongoose.Schema({
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

module.exports = { ImageSchema }