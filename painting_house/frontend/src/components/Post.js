import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { UserContext } from './UserContext'
import dbConnection from '../services/dbConnection'
import ImageHandler from './ImageHandler'
import PostDescriptionAndTags from './PostDescriptionAndTags'
import PostProfile from './PostProfile'
import PostComment from './PostComment'

const POST_DB = 'posts'
const USER_DB = 'users'

const Post = ({ parentPost, setPosts }) => {

    const [post, setPost] = useState(parentPost)

    const navigate = useNavigate()
    const { state } = useLocation()
    const { editedPost } = state || {}
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {

        // In order to update the edited post directly after it
        // Otherwise, it does not update for the long context sometimes
        if (editedPost !== undefined) {
            if (editedPost.title === post.title)
                setPost(editedPost)
        }
    }, [])

    const handleEditClick = (id, title, category, description, tags) => {
        navigate(`/edit/${id}`, {
            state: {
                postTitle: title,
                postCategory: category,
                postDescription: description,
                postTags: tags
            },
        })
    }

    const handleDeleteClick = async (id, title, imageInfos) => {
        if (window.confirm(`Delete ${title}?`)) {
            try {
                await dbConnection.deleteData(id, POST_DB)

                await Promise.all(imageInfos.map(async info => {
                    await dbConnection.deleteBucket(info.idInBucket)
                }))

                const currentPosts = await dbConnection.getData(POST_DB)
                setPosts(currentPosts)
            } catch (error) {
                console.error('Error deleting post and images')
            }
        }
    }

    const handleLikeClick = async (id) => {
        const loggedIn = Object.keys(user).length > 0
        if (!loggedIn) {
            return
        }

        const foundPostHistory = await user.postHistory.find(post => post['postId'] === id)

        let updatedPost
        if (foundPostHistory) {
            const updatedPostHistory = { ...foundPostHistory, liked: !foundPostHistory.liked }
            const updatedUser = { ...user, postHistory: updatedPostHistory }
            await dbConnection
                .updateData(user.id, updatedUser, USER_DB)
                .then(returnedUser => setUser(returnedUser))

            let updatedLike
            if (updatedPostHistory.liked) {
                // not liked -> liked
                updatedLike = '' + (parseInt(post.like) + 1)
            } else {
                // liked -> not liked
                updatedLike = '' + (parseInt(post.like) - 1)
            }
            updatedPost = { ...post, like: updatedLike }
        } else {
            const newPostHistory = {
                postId: id,
                liked: true,
                comments: []
            }

            const updatedUser = { ...user, postHistory: [...user.postHistory, newPostHistory] }
            await dbConnection
                .updateData(user.id, updatedUser, USER_DB)
                .then(returnedUser => setUser(returnedUser))

            const updatedLike = '' + (parseInt(post.like) + 1)
            updatedPost = { ...post, like: updatedLike }
        }

        dbConnection
            .updateData(id, updatedPost, POST_DB)
            .then(returnedPost => { setPost(returnedPost) })
    }

    return (
        <div>
            <table border='1' style={{ width: '100%' }}>
                <tbody>
                    <tr>
                        <td colSpan='2'>{post.category}</td>
                    </tr>
                    <tr>
                        <td colSpan='2'>{post.title}</td>
                    </tr>
                    <tr>
                        <td style={{ width: '40%' }}>
                            <ImageHandler parentImages={post.imageInfos} />
                        </td>
                        <td style={{ width: '60%' }}>
                            <table border='1' style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <PostDescriptionAndTags postDescription={post.description} postTags={post.tags} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table border='1' style={{ width: '100%', height: '10vw' }}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: '85%' }}>
                                                            <PostProfile postId={post.id} author={post.author} />
                                                        </td>
                                                        <td onClick={() => handleLikeClick(post.id)} style={{ width: '15%', cursor: 'default' }}>
                                                            <img className='likeImage' src={require('../images/like.png')} />
                                                            {post.like}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    {user?.profile?.nickname === post.author &&
                        <tr>
                            <td colSpan='2'>
                                <button onClick={() => { handleDeleteClick(post.id, post.title, post.imageInfos) }} style={{ float: 'right' }}>Delete</button>
                                <button onClick={() => { handleEditClick(post.id, post.title, post.category, post.description, post.tags) }} style={{ float: 'right', marginRight: '1vw' }}>Edit</button>
                            </td>
                        </tr>}
                    <tr>
                        <td colSpan='2'>
                            <PostComment post={post} setPost={setPost} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Post