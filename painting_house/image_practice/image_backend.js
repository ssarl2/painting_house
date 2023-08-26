
const upload1 = multer({ dest: 'uploads/' })
app.post('/api/images', upload1.array('images'), (request, response, next) => {
  const images = request.files[0]
  console.log(images)
  // const imageBuffers = []
  //   for (const file of request.files) {
  //     const data = fs.readFileSync(file.path)
  //     const image = { name: file.originalname, data: data }
  //     imageBuffers.push(image)
  //   }
  console.log(images.mimetype)
  const data = fs.readFileSync(images.path)
  console.log(data)
  const image = new Image({
    name: images.originalname,
    data: data,
    contentType: images.mimetype
  })

  console.log(JSON.stringify(image))

  image.save().then(savedPost => {
    response.json(savedPost)
  })
    .catch(error => next(error))
})

app.get('/api/images', (request, response, next) => {
  User.find({}).then(images => {
    console.log(images)
    response.json(images)
  })
    .catch(error => next(error))
})
