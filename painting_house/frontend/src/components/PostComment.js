import { useState, useEffect, useContext } from 'react'
import { Buffer } from 'buffer'

import { UserContext } from './UserContext'
import dbConnection from '../services/dbConnection'

const POST_DB = 'posts'
const USER_DB = 'users'

const PostComment = ({ post, setPost }) => {
    const postId = post.id
    const [inputValue, setInputValue] = useState('')
    const [commentsWithProfile, setCommentsWithProfile] = useState([])
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        const imagePromises = post.comments.map(async comment => {
            if (comment.image) {
                return null
            }

            const commentorObject = {
                nickname: comment.commentor
            }

            const returnedImageObject = await dbConnection.getProfileImage(commentorObject)
            const tempImage = {
                src: `data:${returnedImageObject.contentType};base64,${Buffer.from(returnedImageObject.data).toString('base64')}`,
                alt: returnedImageObject.name
            }

            return { ...comment, image: tempImage }
        })

        Promise.all(imagePromises).then(commentsWithImages => {
            const filteredCommentsWithImages = commentsWithImages.filter(comment => comment !== null)
            setCommentsWithProfile(filteredCommentsWithImages)
        })
    }, [post])


    const handleClick = async (comment, id) => {
        const newComment = {
            commentor: user.profile.nickname,
            comment: comment
        }

        const foundPostHistory = await user.postHistory.find(post => post['postId'] === id)

        let updatedUser
        if (foundPostHistory) {
            const updatedPostHistory = { ...foundPostHistory, comments: [...foundPostHistory.comments, newComment] }
            updatedUser = { ...user, postHistory: updatedPostHistory }
        } else {
            const newPostHistory = {
                postId: id,
                liked: false,
                comments: [newComment]
            }
            updatedUser = { ...user, postHistory: [...user.postHistory, newPostHistory] }
        }
        const updatedPost = { ...post, comments: [...post.comments, newComment] }

        await dbConnection
            .updateData(user.id, updatedUser, USER_DB)
            .then(returnedUser => setUser(returnedUser))

        await dbConnection
            .updateData(id, updatedPost, POST_DB)
            .then(returnedPost => { setPost(returnedPost) })

        setInputValue('')
    }

    return (
        <div>
            <table>
                <tbody>
                    {
                        commentsWithProfile.map(comment =>
                            comment.image ?
                                <tr key={comment.id} >
                                    <td style={{ verticalAlign: 'top' }}>
                                        <img className='profileImage' src={comment.image.src} alt={comment.image.alt} />
                                    </td>
                                    <td>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        {comment.commentor}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ lineBreak: 'anywhere' }}>
                                                        {comment.comment}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </td>
                                </tr>
                                : <tr />
                        )
                    }
                </tbody>
            </table>
            {
                Object.keys(user).length > 0 && (
                    <div style={{ display: 'flex' }}>
                        <input style={{ flex: 1, marginRight: '1vw' }} value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
                        <button onClick={() => { handleClick(inputValue, postId) }}>Comment</button>
                    </div>
                )
            }
        </div >
    )
}

export default PostComment