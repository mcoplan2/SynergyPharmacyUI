import LoginForm from "../components/LoginForm";
import RegistrationComponent from "../components/RegistrationForm";
import UserCredentialsForm from "../components/UserCredentialsForm";
import RegistrationForm from "../components/RegistrationForm"
import { updateApi } from "../util/api";
import { useEffect, useState } from "react";


export default function LoginPage({updateError, updateAppUser}){

    return <>
        <LoginForm updateError={updateError} updateAppUser={updateAppUser}/>
        <RegistrationForm ></RegistrationForm>
    </>
}