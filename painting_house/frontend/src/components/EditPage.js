import { useParams } from 'react-router-dom'

const EditPage = () => {
    const { postId } = useParams()

    // Use the postId in your component logic

    return (
        <div>
            <h3>Edit Page</h3>
            <p>Editing post with ID: {postId}</p>
            {/* Rest of the edit page content */}
        </div>
    )
}

export default EditPage