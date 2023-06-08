import axios from 'axios'

const addr = '192.168.1.99'
const baseUrl = `http://${addr}:3001/notes`

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

export default {
    getAll: getAll,
    create: create,
    update: update
}