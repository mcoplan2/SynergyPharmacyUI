import { useEffect, useState } from "react";
import API from "../util/api";
import UserCredentialsForm from "./UserCredentialsForm";

export default function RegistrationComponent({updateError}){

    // How do I get my child to do my bidding?
    //      How could a child component, update the auth user??
    //      We could use props -> updateAuthUser

    // Lifting State -> the process of passing a reference of a stateUpdateFunction
    // to a child component so that THEY can be the ones to invoke it
    const [user, updateUser] = useState(null);

    useEffect(() => register(user), [user]);

    function register(user){
        if(!user) return;
        let response = API.post('/users', user)
          .then((response) => response.data())
            .then((data) => console.log(data))
            .catch((error) => updateError(error));
    }

    return (
    <>
        <UserCredentialsForm buttonLabel="Register" updateFunction={updateUser}/>
    </>
    )
}