import { useEffect, useState } from "react";
import API from "../util/api";
import UserCredentialsForm from "./UserCredentialsForm";

export default function RegistrationForm({updateError}){

    const [user, updateUser] = useState(null);

    useEffect(() => register(user), [user]);

    function register(user){
        if(!user) return;
        try{
            API.post('/users', {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                password: user.password,
            })
            } catch(error) {
                updateError(error);
            }       
    }

    return (
    <>
        <UserCredentialsForm buttonLabel="Register" updateFunction={updateUser}/>
    </>
    )
}