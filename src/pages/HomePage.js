import {Link} from "react-router-dom";
import RequestForm from "../components/SelectMedicationsMenu";

export default function HomePage({appUser}){
    const{ username, password, firstName, lastName } = appUser
    console.log(appUser)
    return <>
        <h1> Welcome {firstName} {lastName}, you are logged in.</h1>
    </>
}