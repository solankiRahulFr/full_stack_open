import axios from 'axios';
const BASE_URL = 'http://localhost:3001/persons';

const getAllPerson = () =>{
    const req = axios.get(BASE_URL);
    return req.then(res=> res.data);
}

const createPerson = (newPerson) =>{
    const request = axios.post(BASE_URL, newPerson);
    return request.then(res=>res.data);
}

const updatePerson = (id, personDetails) =>{
    const req = axios.put(BASE_URL+"/"+id, personDetails);
    return req.then(res=>res.data);
}

const deletePreson = (id) => {
    const req = axios.delete(BASE_URL+'/'+id);
    return req.then(res=>res.data);
}


const personService = {getAllPerson, createPerson, updatePerson, deletePreson}
export default personService