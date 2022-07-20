import { useEffect, useState } from "react"
import Request from "../../components/Request";
import API, { updateApi } from "../../util/api"
import { getUserById } from "../../util/api";


export default function OpenUserRequestsPage({appUser}){

    const [getRequests, setRequests] = useState('');

    useEffect(() => {
        async function getAllRequests(){   
            const { username, token } = appUser;
            const userId = await getUserById(username);
            try {
                const tokenAPI = updateApi(token);
                console.log(tokenAPI)
                const res = await tokenAPI.get("/requests/user/"+`${userId}`+"/type/OPEN")
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