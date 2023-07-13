import { useEffect, useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'

import dbConnection from '../services/dbConnection'

const POST_DB = 'posts'

const EditPage = () => {
    const { postId } = useParams()
    const { state } = useLocation()
    const navigate = useNavigate()

    const { postTitle, postCategory, postDescription, postTags } = state || {}

    const [newTitle, setNewTitle] = useState(postTitle)
    const [newCategory, setNewCategory] = useState(postCategory)
    const [newDescAndTags, setNewDescAndTags] = useState('')

    useEffect(() => {
        const tags = postTags ? postTags.map(tag => `#${tag}`).join(' ') : ''
        setNewDescAndTags(postDescription + ' ' + tags)
    }, [postDescription, postTags])

    const findTagAndRemove = (str) => {
        const hashIndex = str.indexOf('#')
        if (hashIndex !== -1) {
            const whitespaceIndex = str.indexOf(' ', hashIndex)
            if (whitespaceIndex !== -1) {
                const tag = str.substring(hashIndex + 1, whitespaceIndex)
                const modifiedStr = str.replace(`#${tag}`, '')
                return { tag, modifiedStr }
            } else {
                const tag = str.substring(hashIndex + 1)
                const modifiedStr = str.replace(`#${tag}`, '')
                return { tag, modifiedStr }
            }
        } else {
            return { tag: '', modifiedStr: str }
        }
    }

    const parseDescAndTags = (descAndTags) => {
        const tags = []
        let dat = descAndTags

        while (true) {
            const { tag, modifiedStr } = findTagAndRemove(dat)
            if (tag === '') {
                break
            }
            tags.push(tag)
            dat = modifiedStr
        }

        return { newDescription: dat, newTags: tags }
    }

    const editPost = (event) => {
        event.preventDefault()

        const { newDescription, newTags } = parseDescAndTags(newDescAndTags)

        const postObject = {
            title: newTitle,
            category: newCategory,
            description: newDescription,
            tags: newTags,
            like: "",
            comments: ""
        }

        dbConnection
            .updateData(postId, postObject, POST_DB)
            .then(returnedObject => {
                console.log('Updated successfully')
            })
            .catch(error => console.log(error))

        navigate('/')
    }

    return (
        <div>
            <form onSubmit={editPost}>
                <div className='editInput'>
                    <label>Title : </label>
                    <textarea value={newTitle} onChange={event => setNewTitle(event.target.value)} ></textarea>
                </div>
                <div className='editInput'>
                    <label>Category : </label>
                    <textarea value={newCategory} onChange={event => setNewCategory(event.target.value)} />
                </div>
                <div className='editInput'>
                    <label>Description : </label>
                    <textarea value={newDescAndTags} onChange={event => setNewDescAndTags(event.target.value)} />
                </div>
                <button type='submit'>Edit</button>
            </form>
        </div>
    )
}

export default EditPage