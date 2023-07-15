import { Buffer } from 'buffer'
import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import Lightbox from 'react-spring-lightbox'


const refineImages = (parentImages) => {
    const refinedImages = []

    parentImages.map(pi => {
        refinedImages.push({
            src: `data:${pi.contentType};base64,${Buffer.from(pi.data).toString('base64')}`,
            loading: 'lazy',
            alt: pi.name
        })
    })

    return refinedImages
}

const ImageHandler = ({ parentImages }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [popup, setPopup] = useState(false)
    const lightboxImages = refineImages(parentImages)
    const images = parentImages

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
                <img
                    className='postImage'
                    src={`data:${images[currentIndex].contentType};base64,${Buffer.from(
                        images[currentIndex].data
                    ).toString('base64')}`}
                    alt={images[currentIndex].name}
                    onClick={() => setPopup(true)}
                />
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