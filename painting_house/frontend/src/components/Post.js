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
            <div>{post.category}</div>
            <div>{post.title}</div>
            <table border='1'>
                <tbody>
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
                </tbody>
            </table>
            {
                post.comments.map(comment => <Comment key={comment} comment={comment} />)
            }
        </div>
    )
}

export default Post
