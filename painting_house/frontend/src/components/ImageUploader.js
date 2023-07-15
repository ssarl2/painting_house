import { useDropzone } from 'react-dropzone'

const fileItems = (selectedImages, option) => {
    if (option === 1) // one image
    {
        const selectedImage = selectedImages[0]
        if (selectedImage === undefined)
            return []

        return <img className='postImage' src={`${URL.createObjectURL(selectedImage)}`} key={0} alt="" />
    }
    else if (option === 2) // multiple images
    {
        return selectedImages.map((file, index) => (<img className='postImage' src={`${URL.createObjectURL(file)}`} key={index} alt="" />
        ))
    }
}

const ImageUploader = ({ selectedImages, setSelectedImages, hints, option = 2 }) => {
    const onDrop = (acceptedFiles) => {
        setSelectedImages(acceptedFiles)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const displayImages = fileItems(selectedImages, option)

    return (
        <div>
            <div {...getRootProps()} className={isDragActive ? 'drag-active' : ''}>
                <input {...getInputProps()} />
                <p>{hints}</p>
            </div>
            <ul>{displayImages}</ul>
        </div>
    )
}

export default ImageUploader