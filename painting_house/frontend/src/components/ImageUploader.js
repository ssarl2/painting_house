import { useDropzone } from 'react-dropzone'

const ImageUploader = ({ selectedImages, setSelectedImages }) => {
    const onDrop = (acceptedFiles) => {
        setSelectedImages(acceptedFiles)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const fileItems = selectedImages.map((file, index) => (
        <img className='postImage' src={`${URL.createObjectURL(file)}`} key={index} alt="" />
    ))

    return (
        <div>
            <div {...getRootProps()} className={isDragActive ? 'drag-active' : ''}>
                <input {...getInputProps()} />
                <p>Drag and drop files here, or click to select files</p>
            </div>
            <ul>{fileItems}</ul>
        </div>
    )
}

export default ImageUploader