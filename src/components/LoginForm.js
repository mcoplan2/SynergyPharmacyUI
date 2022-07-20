import API, {updateApi} from "../util/api";
import {useState, useEffect} from 'react'
import UserCredentialsForm from "./UserCredentialsForm";
import {useNavigate} from "react-router-dom"


export default function LoginForm({updateError, updateAppUser}){

    const [user, updateUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => login(user), [user]);

    function login(user){
        if(!user) return;
        API.post("/authenticate", user)
            .then((response) => handleData(response.data))
            // console.log(response.data)
            // .catch((error) => updateError(error));
    }

    async function handleData(data){

        // Update API object to contain a header with the token thats within data
        const {token, username} = data;

        // Update the appUser to hold the User that is logged in
        updateAppUser(data);
        
        }

        navigate("/refills/quickrefill")



    return <>
        <UserCredentialsForm buttonLabel="Login" updateFunction={updateUser}/>
    </>
}
