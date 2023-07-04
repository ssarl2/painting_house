import { useState } from 'react'

const WritePage = () => {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [images, setImages] = useState([]) //TODO support to upload images
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState([]) //TODO parse tags with ',' and ignore white spaces
    const [author, setAuthor] = useState('') //TODO fetch author's info automatically

    return (
        <div>
            <form>
                <div>
                    title: <input value={title} onChange={(event) => setTitle(event.target.value)} />
                </div>
                <div>
                    category: <input value={category} onChange={(event) => setCategory(event.target.value)} />
                </div>
                <div>
                    images: <input value={images} onChange={(event) => setImages(event.target.value)} />
                </div>
                <div>
                    description: <input value={description} onChange={(event) => setDescription(event.target.value)} />
                </div>
                <div>
                    tags: <input value={tags} onChange={(event) => setTags(event.target.value)} />
                </div>
                <button type="submit">Post</button>
            </form>
        </div>
    )
}

export default WritePage