import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import dbConnection from '../services/dbConnection'
import ImageUploader from './ImageUploader'

const USER_DB = 'users'

const CreateUserPage = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [profileImage, setProfileImage] = useState([])

    const createUser = (event) => {
        event.preventDefault()

        const profileObject = {
            nickname: nickname,
            image: [] // will be handled in backend
        }

        const userObject = {
            email: email,
            password: password,
            profile: profileObject
        }

        const formData = new FormData()
        profileImage.forEach(file => {
            formData.append('image', file)
        })
        formData.append('userObject', JSON.stringify(userObject))

        dbConnection
            .createData(formData, USER_DB)
            .then(returnedObject => {
                setEmail('')
                setPassword('')
                setNickname('')
                setProfileImage([])
                navigate('/')
            })
            .catch(error => console.log(error))
    }

    return (
        <div>
            <form onSubmit={createUser}>
                <div className='textboxInput'>
                    <label>Email : </label>
                    <textarea value={email} onChange={event => setEmail(event.target.value)} ></textarea>
                </div>
                <div className='textboxInput'>
                    <label>Password : </label>
                    <textarea value={password} onChange={event => setPassword(event.target.value)} ></textarea>
                </div>
                <div className='textboxInput'>
                    <label>Nickname : </label>
                    <textarea value={nickname} onChange={event => setNickname(event.target.value)} ></textarea>
                </div>
                <ImageUploader selectedImages={profileImage} setSelectedImages={setProfileImage} hints={'Click or drag and drop an image to upload a profile image'} option={1} />
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}

export default CreateUserPage