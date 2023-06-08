import axios from 'axios'

const addr = '192.168.1.99'
const baseUrl = `http://${addr}:3001/persons`

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = (id, name) => {
    return axios.delete(`${baseUrl}/${id}`)
        .catch(error => console.log(error))
        .then(() => console.log(`deleted ${name}`))
}

export default { getAll, create, deletePerson }
