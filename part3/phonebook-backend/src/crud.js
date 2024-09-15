
import axios from "axios";
const baseUrl = 'http://localhost:3000/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
      
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
    
}

const deletePerson = (_id) => {
    return axios.delete(`${baseUrl}/${_id}`)
    
}



export default { getAll: getAll, create: create, deletePerson: deletePerson }


