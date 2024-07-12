import API, {updateApi} from "../util/api";
import {useState, useEffect} from 'react'
import UserCredentialsForm from "./UserCredentialsForm";
import {useNavigate} from "react-router-dom"
import Navbar from "./Navbar";


export default function LoginForm({updateError, updateAppUser}){

    const [user, updateUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => login(user), [user]);

    function login(user){
        if(!user) return;
        const { username, password } = user;
        API.post("/authenticate", {username, password})
            .then((response) => handleData(response.data))
    }

    async function handleData(data){

        // Update API object to contain a header with the token thats within data
        const {token, username, firstName, lastName} = data;

        // Update the appUser to hold the User that is logged in
        updateAppUser(data);
        navigate("/home")
    }


    return <>
        <UserCredentialsForm buttonLabel="Login" updateFunction={updateUser}/>
        <p></p>
    </>
}
