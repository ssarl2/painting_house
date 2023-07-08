import dbConnection from '../services/dbConnection'
import ImageHandler from './ImageHandler'

const POST_DB = 'posts'

const Comment = ({ comment }) => {
    return (
        <div>
            {comment}
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

    const handleClick = (id, title) => {
        if (window.confirm(`Delete ${title}?`))
            dbConnection
                .deleteData(id, title, POST_DB)
                .then(() => { return dbConnection.getData(POST_DB) })
                .then(currentPosts => setPosts(currentPosts))
    }

    return (
        <div>
            <table border='1'>
                <tbody>
                    <tr>
                        <td colSpan='2'>{post.category}</td>
                    </tr>
                    <tr>
                        <td colSpan='2'>{post.title}</td>
                    </tr>
                    <tr>
                        <td>
                            <ImageHandler images={post.images} />
                        </td>
                        <td>
                            <table border='1'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div>
                                                {post.description}
                                                <div>{post.tags.join(", ")}</div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table border='1'>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <Profile />
                                                        </td>
                                                        <td>
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
                            {
                                post.comments.map(comment => <Comment key={comment} comment={comment} />)
                            }
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Post
