import { useState, useEffect, useContext } from 'react'

import { UserContext } from './UserContext'
import dbConnection from '../services/dbConnection'

const POST_DB = 'posts'
const USER_DB = 'users'

const PostComment = ({ post, setPost }) => {
    const postId = post.id
    const [inputValue, setInputValue] = useState('')
    const [comments, setComments] = useState(post.comments)
    const [updateComments, setUpdateComments] = useState(false)
    const { user, setUser } = useContext(UserContext)

    const handleClick = async (comment, id) => {
        setComments([...comments, comment])
        setUpdateComments(true)

        const foundPostHistory = await user.postHistory.find(post => post['postId'] === id)

        let updatedUser
        if (foundPostHistory) {
            const updatedPostHistory = { ...foundPostHistory, comments: [...foundPostHistory.comments, comment] }
            updatedUser = { ...user, postHistory: updatedPostHistory }
        } else {
            const newPostHistory = {
                postId: id,
                liked: false,
                comments: [comment]
            }
            updatedUser = { ...user, postHistory: [...user.postHistory, newPostHistory] }
        }
        const updatedPost = { ...post, comments: [...post.comments, comment] }

        await dbConnection
            .updateData(user.id, updatedUser, USER_DB)
            .then(returnedUser => setUser(returnedUser))

        dbConnection
            .updateData(id, updatedPost, POST_DB)
            .then(returnedPost => { setPost(returnedPost) })

        setComments([...comments, comment])
        setUpdateComments(true)
    }

    useEffect(() => {
        if (updateComments) {
            const updatedPost = { ...post, comments: comments }
            dbConnection
                .updateData(postId, updatedPost, POST_DB)
                .then(() => { return dbConnection.getDataById(postId, POST_DB) })
                .then(currentPost => {
                    setComments(currentPost.comments)
                    setInputValue('')
                    setUpdateComments(false)
                })
        }
    }, [updateComments])

    return (
        <div>
            {
                comments.map(comment => <table key={comment}>
                    <tbody>
                        <tr>
                            <td>
                                [User image]
                            </td>
                            <td>
                                commentor :
                            </td>
                            <td>
                                {comment}
                            </td>
                        </tr>
                    </tbody>
                </table>)
            }
            {Object.keys(user).length > 0 && (
                <div style={{ display: 'flex' }}>
                    <input style={{ flex: 1, marginRight: '1vw' }} value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
                    <button onClick={() => { handleClick(inputValue, postId) }}>Comment</button>
                </div>
            )}
        </div>
    )
}

export default PostComment