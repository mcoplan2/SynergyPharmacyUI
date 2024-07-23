import axios from "axios";

let BASE_API_URL = "http://localhost:8080";

let API = axios.create({
    baseURL: BASE_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        withCredentials: true
    }
});


export function updateApi(token){
    API = axios.create({
        baseURL: BASE_API_URL,
        timeout: 10000,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return API;
}

export async function getUserById(username) {
        try {
            const res = await API.get("/users/username/"+`${username}`)
            const {userId} = res.data
            return userId;
        } catch(error) {
            console.log(error)
        }   
}

export default API;