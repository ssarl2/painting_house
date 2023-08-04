const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');
const cors = require('cors')
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const app = express();

// Middleware
app.use(cors())
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Mongo URI
const mongoURI = 'something' // Replace this with your MongoDB URI

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs, gridfsBucket;
const bucketName = 'myBuc'

conn.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: bucketName
  })

  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection(bucketName);
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const fileInfo = {
        filename: file.originalname,
        bucketName: bucketName
      };
      resolve(fileInfo);
    });
  }
});
const upload = multer({ storage });

// @route GET /
// @desc Loads form
// app.get('/', (req, res) => {
//   gfs.files.find().toArray((err, files) => {
//     // Check if files
//     if (!files || files.length === 0) {
//       res.render('index', { files: false });
//     } else {
//       files.map(file => {
//         if (
//           file.contentType === 'image/jpeg' ||
//           file.contentType === 'image/png'
//         ) {
//           file.isImage = true;
//         } else {
//           file.isImage = false;
//         }
//       });
//       res.render('index', { files: files });
//     }
//   });
// });

// @route POST /upload
// @desc  Uploads file to DB
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('uploading..')
  console.log(req.file)
  res.json({ file: req.file });
  // res.redirect('/');
});

// @route GET /files
// @desc  Display all files in JSON
app.get('/files', async (req, res) => {
  console.log('files')
  const files = await gfs.files.find().toArray()
  // const file = await gfs.files.findOne({filename:'62e83cf098f2753060d14ff1c06ee96d.png'})
  console.log(files)
  const file = files.pop()
  console.log(file)
  const readStream = gridfsBucket.openDownloadStream(file._id)
  readStream.pipe(res)
  // res.json(file)
})

// @route GET /files/:filename
// @desc  Display single file object
app.get('/files/:filename', async (req, res) => {
  console.log('filename')
  const filename = req.params.filename
  console.log(filename)

  const file = await gfs.files.findOne({ filename: filename })

  const readStream = gridfsBucket.openDownloadStream(file._id)
  readStream.pipe(res)
});

// // @route GET /image/:filename
// // @desc Display Image
// app.get('/image/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if file
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: 'No file exists'
//       });
//     }

//     // Check if image
//     if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
//       // Read output to browser
//       const readstream = gfs.createReadStream(file.filename);
//       readstream.pipe(res);
//     } else {
//       res.status(404).json({
//         err: 'Not an image'
//       });
//     }
//   });
// });

// @route DELETE /files/:id
// @desc  Delete file
app.delete('/files/:filename', async (req, res) => {
  const filename = req.params.filename
  const file = await gfs.files.findOne({ filename: filename })
  console.log(file._id)

  gridfsBucket.delete(file._id)
  // gfs.remove({ _id: file._id, root: 'myBuc' }, (err, gridStore) => {
  //   if (err) {
  //     return res.status(404).json({ err: err });
  //   }
  // });
});

const port = 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));