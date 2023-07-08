import ImageHandler from './ImageHandler'

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

const Post = ({ post }) => {
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
                                    <tr>
                                        <td>
                                            <Profile />
                                        </td>
                                        <td>
                                            {post.like}
                                        </td>
                                    </tr>
                                </td>
                            </tr>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan='2'>
                            <button style={{ float: 'right' }}>delete</button>
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
