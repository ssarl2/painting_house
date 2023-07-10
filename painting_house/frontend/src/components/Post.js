import { useState, useEffect } from 'react'
import dbConnection from '../services/dbConnection'
import ImageHandler from './ImageHandler'

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
    const [descAndTags, setDescAndTags] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)
    const descAndTagsMaxLength = 120 // Maximum number of characters to display initially

    useEffect(() => {
        const tags = post.tags.map(tag => `#${tag}`).join(' ')
        const combineDescAndTags = post.description !== '' ? `${post.description}, ${tags}` : `${tags}`
        setDescAndTags(combineDescAndTags)
    }, [post.description, post.tags])

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const renderDescription = () => {
        if (isExpanded || descAndTags.length <= descAndTagsMaxLength) {
            return descAndTags
        } else {
            return descAndTags.slice(0, descAndTagsMaxLength)
        }
    }

    const handleClick = (id, title) => {
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
                                            <div className='postDescriptionAndTagsBox'>
                                                {renderDescription()}{!isExpanded && descAndTags.length > descAndTagsMaxLength && (<button style={{ color: 'gray', background: 'none', border: 'none' }} onClick={toggleExpand}>...more</button>)}
                                                {isExpanded && descAndTags.length > descAndTagsMaxLength && (
                                                    <button style={{ color: 'gray', background: 'none', border: 'none' }} onClick={toggleExpand}>...less</button>
                                                )}
                                            </div>
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
                            <button onClick={() => { handleClick(post.id, post.title) }} style={{ float: 'right' }}>delete</button>
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
