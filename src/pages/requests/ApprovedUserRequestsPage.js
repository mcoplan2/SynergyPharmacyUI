import { useEffect, useState } from "react"
import Request from "../../components/Request";
import { updateApi } from "../../util/api";
import { getUserById } from "../../util/api";


export default function ApprovedUserRequestsPage({appUser}){

    const [getRequests, setRequests] = useState('');

    useEffect(() => {
        async function getAllRequests(){   
            const { username, token } = appUser;
            const userId = await getUserById(username);
            try {
                const tokenAPI = updateApi(token);
                const res = await tokenAPI.get("/requests/user/"+`${userId}`+"/type/APPROVED")
                setRequests(res.data)
            } catch(error) {
                console.log(error)
            }
        }
        getAllRequests();
        }, []);

    return <>
        {getRequests && getRequests.map((request) => 
            <Request key={request.id} request={request} />
        )}

        {!getRequests || getRequests==0 && <h3>Loading Requests...</h3>}
    </>
}