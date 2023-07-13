import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import dbConnection from '../services/dbConnection'
import ImageHandler from './ImageHandler'
import PostDescriptionAndTags from './PostDescriptionAndTags'

const POST_DB = 'posts'

const Comment = ({ post }) => {
    const id = post.id
    const [inputValue, setInputValue] = useState('')
    const [comments, setComments] = useState(post.comments)
    const [updateComments, setUpdateComments] = useState(false)

    const handleClick = (comment) => {
        setComments([...comments, comment])
        setUpdateComments(true)
    }

    useEffect(() => {
        if (updateComments) {
            const updatedPost = { ...post, comments: comments }
            dbConnection
                .updateData(id, updatedPost, POST_DB)
                .then(() => { return dbConnection.getDataById(id, POST_DB) })
                .then(currentPost => {
                    console.log(currentPost)
                    setComments(currentPost.comments)
                    setInputValue('')
                    setUpdateComments(false)
                })
        }
    }, [updateComments])

    return (
        <div>
            {
                comments.map(comment => <div key={comment}>
                    {comment}
                </div>)
            }
            <div style={{ display: 'flex' }}>
                <input style={{ flex: 1, marginRight: '1vw' }} value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
                <button onClick={() => { handleClick(inputValue) }}>Comment</button>
            </div>
        </div>
    )
}

const Profile = () => {
    return (
        <div>
            <div>Profile nickname</div>
            <div>Profile image</div>
        </div>
    )
}

const Post = ({ post, setPosts }) => {

    const navigate = useNavigate()
    const handleEditClick = (id) => {
        navigate(`/edit/${id}`)
    }

    const handleDeleteClick = (id, title) => {
        if (window.confirm(`Delete ${title}?`))
            dbConnection
                .deleteData(id, title, POST_DB)
                .then(() => { return dbConnection.getData(POST_DB) })
                .then(currentPosts => setPosts(currentPosts))
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
                            <ImageHandler images={post.images} />
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
                                                            <Profile />
                                                        </td>
                                                        <td style={{ width: '15%' }}>
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
                    <tr>
                        <td colSpan='2'>
                            <button onClick={() => { handleDeleteClick(post.id, post.title) }} style={{ float: 'right' }}>Delete</button>
                            <button onClick={() => { handleEditClick(post.id) }} style={{ float: 'right', marginRight: '1vw' }}>Edit</button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2'>
                            <Comment post={post} />
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Post
