import { useState, useEffect, useContext } from 'react'

import { UserContext } from './UserContext'
import dbConnection from '../services/dbConnection'

const POST_DB = 'posts'
const USER_DB = 'users'

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

const PostComment = ({ post, setPost }) => {
    const [inputValue, setInputValue] = useState('')
    const [commentsWithProfile, setCommentsWithProfile] = useState([])
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {

        const imagePromises = post.comments.map(async comment => {
            if (comment.imageInfo) {
                return null
            }

            const returnedImageInfo = await dbConnection.getProfileImage({ nickname: comment.commentor })
            const refinedImage = await refineImage(returnedImageInfo)

            return { ...comment, image: refinedImage }
        })

        Promise.all(imagePromises).then(commentsWithImages => {
            const filteredCommentsWithImages = commentsWithImages.filter(comment => comment !== null)
            setCommentsWithProfile(filteredCommentsWithImages)
        })
    }, [post])

    const deleteComment = (commentId, postId) => {
        const updatedComments = post.comments.filter(comment => comment.id !== commentId)
        const updatedPost = { ...post, comments: updatedComments }
        dbConnection
            .updateData(postId, updatedPost, POST_DB)
            .then(returnedPost => { setPost(returnedPost) })
    }

    const handleClick = async (comment, postId) => {
        if (!comment) {
            return null
        }

        const newComment = {
            commentor: user.profile.nickname,
            comment: comment
        }

        const foundPostHistory = await user.postHistory.find(post => post['postId'] === postId)

        let updatedUser
        if (foundPostHistory) {
            const updatedPostHistory = { ...foundPostHistory, comments: [...foundPostHistory.comments, newComment] }
            updatedUser = { ...user, postHistory: updatedPostHistory }
        } else {
            const newPostHistory = {
                postId: postId,
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
            .updateData(postId, updatedPost, POST_DB)
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
                                                        {comment.comment}&nbsp;
                                                        {user.profile.nickname === comment.commentor && (
                                                            <button style={{ color: 'gray', border: 'none', background: 'none' }} onClick={() => deleteComment(comment.id, post.id)}>delete</button>
                                                        )}
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
                        <button onClick={() => { handleClick(inputValue, post.id) }}>Comment</button>
                    </div>
                )
            }
        </div >
    )
}

export default PostComment