import React, { useState } from 'react'
import axios from 'axios'

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null)

  const handleDrop = (acceptedFiles) => {
    console.log(acceptedFiles[0])
    setSelectedFile(acceptedFiles[0])
  }

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.log('Please select a file')
        return
      }

      const formData = new FormData()
      formData.append('file', selectedFile)

      // Replace 'http://localhost:3001/upload' with your backend upload endpoint
      await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log('File uploaded successfully!')
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  return (
    <div>
      <input type='file' name='mypic' onChange={(e) => handleDrop(e.target.files)} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default ImageUpload