import {Link} from "react-router-dom";
import RequestForm from "../components/SelectMedicationsMenu";

export default function HomePage({appUser}){
    const{ username } = appUser
    return <>
        <h1> {username} has been logged in!</h1>
    </>
}