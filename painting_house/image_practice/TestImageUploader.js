import React, { useState } from 'react'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'

const ImageUploader = () => {
    const [selectedFiles, setSelectedFiles] = useState([])

    const onDrop = (acceptedFiles) => {
        setSelectedFiles(acceptedFiles)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const fileItems = selectedFiles.map((file, index) => (
        <img src={`${URL.createObjectURL(file)}`} key={index} alt="" />
    ))

    const uploadFiles = () => {
        const formData = new FormData()
        selectedFiles.forEach(file => {
            // console.log(file)
            formData.append('images', file)
        })

        axios.post('http://192.168.1.111:3001/api/images', formData)
            .then((response) => {
                // Handle successful upload
                console.log('Files uploaded:', response.data)
            })
            .catch((error) => {
                // Handle upload error
                console.error('Upload error:', error)
            })
    }

    return (
        <div>
            <div {...getRootProps()} className={isDragActive ? 'drag-active' : ''}>
                <input {...getInputProps()} />
                <p>Drag and drop files here, or click to select files</p>
            </div>
            <ul>{fileItems}</ul>
            {selectedFiles.length > 0 && (
                <button onClick={uploadFiles}>Upload</button>
            )}
        </div>
    )
}

export default ImageUploader