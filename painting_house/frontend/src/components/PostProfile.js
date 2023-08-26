import { useState, useEffect } from 'react'

import dbConnection from '../services/dbConnection'

const POST_DB = 'posts'

const refineImage = async (imageInfo) => {
    try {
        // this will return image at an address. src should that that address
        await dbConnection.getImageById(imageInfo.idInBucket)

        const refinedImage = {
            src: `http://${dbConnection.backendAddr}:3001/api/images/${imageInfo.idInBucket}`,
            loading: 'lazy',
            alt: imageInfo.name
        }
        return refinedImage

    } catch (error) {
        console.error('Error fetching image:', error)
    }
}

const Profile = ({ author }) => {
    const [image, setImage] = useState({})

    useEffect(() => {
        const getImage = async () => {
            const returnedImageInfo = await dbConnection.getProfileImage({ nickname: author })
            const refinedImage = await refineImage(returnedImageInfo)
            setImage(refinedImage)
        }
        getImage()

    }, [])

    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <img className='profileImage' src={image.src} alt={image.alt} />
                    </td>
                    <td>
                        <div>{author}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Profile