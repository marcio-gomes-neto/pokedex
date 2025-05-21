import axios from "axios";

//Aqui seria interessante usar variaveis de ambiente (.env)
const baseQuery = 'http://localhost:3000/api/pokemon';

export const api = axios.create({
    baseURL: baseQuery,
    headers: {
        "Content-Type": "applicaton/json",
    }
})
