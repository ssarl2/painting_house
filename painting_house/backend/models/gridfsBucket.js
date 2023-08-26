const mongoose = require('mongoose')
const { GridFsStorage } = require('multer-gridfs-storage')
const multer = require('multer')

const mongoURI = process.env.MONGODB_URI

const conn = mongoose.createConnection(mongoURI)

if (!conn) {
  throw new Error('Failed connecting for GridFsStorage')
}

const bucketName = 'myBucket'
const GridfsBucket = async () => {
  return new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: bucketName
  })
}

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: bucketName
      }
      resolve(fileInfo)
    })
  }
})
const Upload = multer({ storage })

module.exports = { Upload, GridfsBucket }