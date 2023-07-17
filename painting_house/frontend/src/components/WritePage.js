import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from './UserContext'
import dbConnection from '../services/dbConnection'
import ImageUploader from './ImageUploader'

const POST_DB = 'posts'

const WritePage = () => {
    const navigate = useNavigate()

    const [newTitle, setNewTitle] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [selectedImages, setSelectedImages] = useState([])
    const [newDescription, setNewDescription] = useState('')
    const [newTags, setNewTags] = useState([])
    const { user } = useContext(UserContext)

    const addPost = (event) => {
        event.preventDefault()

        const postObject = {
            title: newTitle,
            category: newCategory,
            images: [], // will be handled in backend
            description: newDescription,
            tags: newTags,
            author: user.profile.nickname
        }

        const formData = new FormData()
        selectedImages.forEach(file => {
            formData.append('images', file)
        })

        formData.append('postObject', JSON.stringify(postObject))

        dbConnection
            .createData(formData, POST_DB)
            .then(returnedObject => {
                setNewTitle('')
                setNewCategory('')
                setSelectedImages([])
                setNewDescription('')
                setNewTags([])
                navigate('/')
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <form onSubmit={addPost}>
                <div>
                    title: <input value={newTitle} onChange={(event) => setNewTitle(event.target.value)} />
                </div>
                <div>
                    category: <input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} />
                </div>
                <ImageUploader selectedImages={selectedImages} setSelectedImages={setSelectedImages} hints={'Drag and drop files here, or click to select files'} />
                <div>
                    description: <input value={newDescription} onChange={(event) => setNewDescription(event.target.value)} />
                </div>
                <div>
                    tags: <input value={newTags.join(',')} onChange={(event) => setNewTags(event.target.value.split(','))} />
                </div>
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

export default WritePage