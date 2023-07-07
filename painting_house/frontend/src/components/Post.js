import { Buffer } from 'buffer'

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
                            {post.images.map((image, index) => (
                                <img src={`data:${image.contentType};base64,${Buffer.from(image.data).toString('base64')}`} alt={image.name} key={index} />
                            ))}
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
