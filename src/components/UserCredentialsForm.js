import { useState, useEffect } from "react";


export default function UserCredentialsForm({buttonLabel, updateFunction}){

    // State Variables are special in that onChange/mutation of state
    // React will trigger a rerender through a process called Reconcilliation

    // How do we use state in React
    // We can tap into state using Hooks;

    // The main hook to use state in a component is the useState() hook

    //   useState() is a function that returns two things
    //           0th index: the state variable
    //           1st index: the function to update the state variable
    //   let [nameOfVariable, nameOfFunction] = useState(initialState); 

    let [username, updateUsername] = useState("");
    let [password, updatePassword] = useState("");
    let [firstname, updateFirstname] = useState("");
    let [lastname, updateLastname] = useState("");


    function handleChangeUsername(event){
        updateUsername(event.target.value)
    }

    function handleChangeFirstname(event){
        updateFirstname(event.target.value)
    }

    function handleChangeLastname(event){
        updateLastname(event.target.value)
    }

    function handleChangePassword(event){
        updatePassword(event.target.value);
    }

    function submit(){
        // TODO: combine the username/password into an object,
        // and lift the object back to the parent component

        let user = {
            username: username,
            firstName: firstname,
            lastName: lastname,
            password: password,
        }

        updateFunction(user)
    }

    return <>
        <input type="text" value={firstname} onChange={handleChangeFirstname} placeholder="firstname"/><br/>
        <input type="text" value={lastname} onChange={handleChangeLastname} placeholder="lastname"/><br/>
        <input type="text" value={username} onChange={handleChangeUsername} placeholder="username"/><br/>
        <input type="password" value={password} onChange={handleChangePassword} placeholder="password"/><br/>
        <button onClick={submit}>{buttonLabel}</button>
    </>
}