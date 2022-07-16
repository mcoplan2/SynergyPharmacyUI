import axios from "axios";

let BASE_API_URL = "http://localhost:8080";

let API = axios.create({
    baseURL: BASE_API_URL,
    timeout: 10000
});


export function updateApi(token){
    API = axios.create({
        baseURL: BASE_API_URL,
        timeout: 1000,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export default API;