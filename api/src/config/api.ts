import axios from "axios";

//Aqui seria interessante usar variaveis de ambiente (.env)
const baseQuery = "https://pokeapi.co/api/v2/";

export const api = axios.create({
    baseURL: baseQuery,
    headers: {
        "Content-Type": "applicaton/json",
    }
})
