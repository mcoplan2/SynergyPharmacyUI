import {Link} from "react-router-dom";
import RequestForm from "../components/SelectMedicationsMenu";

export default function HomePage({appUser}){
    const{ username } = appUser
    return <>
        <h1> Welcome {username}, you are logged in.</h1>
    </>
}