import React from 'react'
import { useDropzone } from 'react-dropzone'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const fileItems = (selectedImages, option) => {
    if (option === 1) // one image
    {
        const selectedImage = selectedImages[0]
        if (selectedImage === undefined)
            return []

        return <img className='uploadImage' src={`${URL.createObjectURL(selectedImage)}`} key={0} alt='' />
    }
    else if (option === 2) // multiple images
    {
        return selectedImages.map((file, index) => (
            <Draggable key={index} draggableId={`image-${index}`} index={index}>
                {(provided) => (
                    <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} className='centerUploadImage'>
                        <img
                            className='uploadImage'
                            src={`${URL.createObjectURL(file)}`}
                            alt=''
                        />
                    </div>
                )}
            </Draggable>
        ))
    }
}

const ImageUploader = ({ selectedImages, setSelectedImages, hints, option = 2 }) => {
    const onDrop = (acceptedFiles) => {
        setSelectedImages(acceptedFiles)
    }

    const onDragEnd = (result) => {
        if (!result.destination) return
        const reorderedImages = Array.from(selectedImages)
        const [reorderedImage] = reorderedImages.splice(result.source.index, 1)
        reorderedImages.splice(result.destination.index, 0, reorderedImage)
        setSelectedImages(reorderedImages)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div>
            <div {...getRootProps()} className={isDragActive ? 'drag-active' : ''}>
                <input {...getInputProps()} />
                <p>{hints}</p>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='images'>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {fileItems(selectedImages, option)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}

export default ImageUploader