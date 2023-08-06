import { useState, useEffect } from 'react'
import { Buffer } from 'buffer'

import dbConnection from '../services/dbConnection'

const Profile = ({ author }) => {
    const [image, setImage] = useState({})

    // useEffect(() => {
    //     const profileObject = {
    //         nickname: author
    //     }

    //     dbConnection
    //         .getProfileImage(profileObject)
    //         .then(returnedImageObject => {
    //             const tempImage = {
    //                 src: `data:${returnedImageObject.contentType};base64,${Buffer.from(returnedImageObject.data).toString('base64')}`,
    //                 alt: returnedImageObject.name
    //             }
    //             setImage(tempImage)
    //         })
    // }, [])

    return (
        <table>
            {/* <tbody>
                <tr>
                    <td>
                        <img className='profileImage' src={image.src} alt={image.alt} />
                    </td>
                    <td>
                        <div>{author}</div>
                    </td>
                </tr>
            </tbody> */}
        </table>
    )
}

export default Profile