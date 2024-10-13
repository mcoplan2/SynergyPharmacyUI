import { useEffect, useState } from "react";
import API from "../util/api";
import UserCredentialsForm from "./UserCredentialsForm";
import { getUserById } from "../util/api";

export default function EditProfile({updateError, appUser}){

    // How do I get my child to do my bidding?
    //      How could a child component, update the auth user??
    //      We could use props -> updateAuthUser

    // Lifting State -> the process of passing a reference of a stateUpdateFunction
    // to a child component so that THEY can be the ones to invoke itd
    const [user, updateUser] = useState(null);

    useEffect(() =>  {
        async function register(user) {
            if(!user) return;
            const userId = await getUserById(appUser.username);
            const payload = {};

            if (user.username && user.username !== "") {
                payload.username = user.username;
            }

            if (user.password && user.password !== "") {
                payload.passWord = user.password;
            }

            if (user.firstName && user.firstName !== "") {
                payload.firstName = user.firstName;
            }

            if (user.lastName && user.lastName !== "") {
                payload.lastName = user.lastName;
            }

            let response = await API.patch('/users/'+`${userId}`, payload);
            window.location.href="/";
            console.log(response.data)
        } 
    if (user) {
        register(user);
    }
    
}, [user, appUser]);


    


    return (
    <>
        <UserCredentialsForm buttonLabel="Save Changes" updateFunction={updateUser}/>
    </>
    )
}