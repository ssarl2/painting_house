import { useState } from 'react'

import dbConnection from '../services/dbConnection'

const POST_DB = 'posts'

const WritePage = () => {
    const [newTitle, setNewTitle] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [newImages, setNewImages] = useState([]) //TODO support to upload images
    const [newDescription, setNewDescription] = useState('')
    const [newTags, setNewTags] = useState([])
    const [newAuthor, setNewAuthor] = useState('') //TODO fetch author's info automatically

    const addPost = (event) => {
        event.preventDefault()

        const postObject = {
            title: newTitle,
            category: newCategory,
            images: newImages,
            description: newDescription,
            tags: newTags,
            author: newAuthor
        }

        dbConnection
            .createData(postObject, POST_DB)
            .then(returnedObject => {
                setNewTitle('')
                setNewCategory('')
                setNewImages([])
                setNewDescription('')
                setNewTags([])
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
                <div>
                    images: <input value={newImages.join(',')} onChange={(event) => setNewImages(event.target.value.split(','))} />
                </div>
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