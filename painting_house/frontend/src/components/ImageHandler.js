import { useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import Lightbox from 'react-spring-lightbox'
import dbConnection from '../services/dbConnection'

const POST_DB = 'posts'

const refineImages = async (postId, parentImages) => {
    const refinedImages = []

    await Promise.all(
        parentImages.map(async image => {
            try {
                await dbConnection.getImageById(postId, image.idInBucket, POST_DB)

                const newImage = {
                    src: `http://127.0.0.1:3001/api/posts/${postId}/${image.idInBucket}`,
                    loading: 'lazy',
                    alt: image.name
                }
                refinedImages.push(newImage)

            } catch (error) {
                console.error('Error fetching image:', error)
            }
        })
    )
    return refinedImages
}

const ImageHandler = ({ postId, parentImages }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [popup, setPopup] = useState(false)
    const [lightboxImages, setLightboxImages] = useState([])
    const images = parentImages

    useEffect(() => {
        const getImages = async () => {
            const refinedImages = await refineImages(postId, parentImages)
            setLightboxImages(refinedImages)
        }

        getImages()
    }, [postId, parentImages])

    const handleSwipe = useSwipeable({
        onSwipedLeft: () => {
            if (currentIndex < images.length - 1) {
                setCurrentIndex(currentIndex + 1)
            }
        },
        onSwipedRight: () => {
            if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1)
            }
        },
    })

    const gotoPrevious = () =>
        currentIndex > 0 && setCurrentIndex(currentIndex - 1)

    const gotoNext = () =>
        currentIndex + 1 < lightboxImages.length &&
        setCurrentIndex(currentIndex + 1)


    return (
        <div>
            <div {...handleSwipe}>
                {popup && (
                    <Lightbox
                        isOpen={true}
                        onPrev={gotoPrevious}
                        onNext={gotoNext}
                        images={lightboxImages}
                        currentIndex={currentIndex}
                        style={{ backgroundColor: 'rgba(0, 0, 0, .8)' }}
                        onClose={() => setPopup(false)}
                    />
                )}
                {lightboxImages.length > 0 && (
                    <img
                        className='postImage'
                        src={`${lightboxImages[currentIndex].src}`}
                        alt={lightboxImages[currentIndex].name}
                        onClick={() => setPopup(true)}
                    />
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {images.map((_, index) => (
                    <button className='postImageIndex'
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        style={{
                            backgroundColor: index === currentIndex ? 'black' : 'gray'
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default ImageHandler