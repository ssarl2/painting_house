import { Buffer } from 'buffer'
import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'

const ImageHandler = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

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

    return (
        <div>
            <div {...handleSwipe}>
                <img
                    className='postImage'
                    src={`data:${images[currentIndex].contentType};base64,${Buffer.from(
                        images[currentIndex].data
                    ).toString('base64')}`}
                    alt={images[currentIndex].name}
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