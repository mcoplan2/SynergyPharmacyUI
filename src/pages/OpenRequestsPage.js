import { useEffect, useState } from "react"
import Request from "../components/Request";
import API from "../util/api"


export default function OpenRequestsPage(){

    const [getRequests, setRequests] = useState('');

    useEffect(() => {
        async function getAllRequests(){   
            try {
                const res = await API.get("/requests")
                setRequests(res.data)
            } catch(error) {
                console.log(error)
            }
        }
        getAllRequests();
        }, []);

        console.log(getRequests)
    return <>
        {getRequests && getRequests.map((request) => 
            <Request key={request.id} request={request} />
        )}

        {!getRequests && <h3>Loading Requests...</h3>}
    </>
}