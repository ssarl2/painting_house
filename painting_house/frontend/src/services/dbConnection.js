import axios from 'axios'

const addr = '192.168.1.111'
const baseUrl = `http://${addr}:3001/api`

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

export default { getData, getDataById, createData, deleteData, updateData }