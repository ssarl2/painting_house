import axios from 'axios'

const addr = '192.168.1.99'
const baseUrl = `http://${addr}:3001/api/users`

const getUser = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createUser = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteUser = (id, name) => {
    return axios.delete(`${baseUrl}/${id}`)
        .catch(error => console.log(error))
        .then(() => console.log(`deleted ${name}`))
}

const updateUser = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getUser, createUser, deleteUser, updateUser }
