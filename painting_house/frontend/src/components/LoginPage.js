import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from './UserContext'
import dbConnection from '../services/dbConnection'

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { setUser } = useContext(UserContext)

    const login = (event) => {
        event.preventDefault()

        const loginObject = {
            email: email,
            password: password
        }

        dbConnection
            .login(loginObject)
            .then(loggedInUser => {
                setUser(loggedInUser)
                navigate('/')
            })
            .catch(error => {
                console.log('Login failed:', error)
            })
    }

    return (
        <div>
            <form onSubmit={login}>
                <div>
                    <label>Email : </label>
                    <input value={email} onChange={event => setEmail(event.target.value)} ></input>
                </div>
                <div>
                    <label>Password : </label>
                    <input value={password} type='password' onChange={event => setPassword(event.target.value)} ></input>
                </div>
                <button type='submit'>Login</button>
                <button onClick={() => navigate('/create_user')} style={{ marginLeft: '10px' }}>Create user</button>
            </form>
        </div>
    )
}

export default Login