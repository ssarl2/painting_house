import axios from 'axios'

const backendAddr = 'localhost'
const baseUrl = `http://${backendAddr}:3001/api`

const getData = (data) => {
    const request = axios.get(`${baseUrl}/${data}`)
    return request.then(response => response.data)
}

const getDataById = (id, data) => {
    const request = axios.get(`${baseUrl}/${data}/${id}`)
    return request.then(response => response.data)
}

const createData = (newObject, data) => {
    const request = axios.post(`${baseUrl}/${data}`, newObject)
    return request.then(response => response.data)
}

const deleteData = (id, name, data) => {
    return axios.delete(`${baseUrl}/${data}/${id}`)
        .catch(error => console.log(error))
        .then(() => console.log(`deleted ${name}`))
}

const updateData = (id, newObject, data) => {
    const request = axios.put(`${baseUrl}/${data}/${id}`, newObject)
    return request.then(response => response.data)
}

const login = (loginObject) => {
    const request = axios.post(`${baseUrl}/login`, loginObject)
    return request.then(response => response.data)
}

const getProfileImage = (profileObject) => {
    const request = axios.post(`${baseUrl}/users/profile`, profileObject)
    return request.then(response => response.data)
}

const getImageById = (parentId, imageId, data) => {
    const request = axios.get(`${baseUrl}/${data}/${parentId}/${imageId}`)
    return request.then(response => response.data)
}

export default { backendAddr, getData, getDataById, createData, deleteData, updateData, login, getProfileImage, getImageById }