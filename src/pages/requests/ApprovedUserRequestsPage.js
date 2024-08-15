import { useEffect, useState } from "react"
import Request from "../../components/Request";
import { updateApi } from "../../util/api";
import { getUserById } from "../../util/api";
import AlphabetFilter from "../../components/AlphabetFilter";


export default function ApprovedUserRequestsPage({appUser}){

    const [getRequests, setRequests] = useState('');
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [selectedSearch, setSelectedSearch] = useState('');

    useEffect(() => {
        async function getAllRequests(){   
            const { username, token } = appUser;
            const userId = await getUserById(username);

            let query = '';
            if(selectedLetter) {
                query += `letter=${selectedLetter}`
            }
            if(selectedSearch) {
                query += (query ? '&' : '') + `query=${selectedSearch}`
            }

            try {
                const tokenAPI = updateApi(token);
                const res = await tokenAPI.get("/requests/user/"+`${userId}`+"/type/APPROVED/medicine/filter"+`${query ? `?${query}` : ''}`);
                setRequests(res.data)
            } catch(error) {
                console.log(error)
            }
        }
        getAllRequests();
        }, [selectedLetter, selectedSearch]);

    return <>
        <p></p>
        <AlphabetFilter onLetterClick={setSelectedLetter} onSearch={setSelectedSearch} />
        {getRequests && getRequests.map((request) => 
            <Request key={request.id} request={request} />
        )}

        {!getRequests || getRequests==0 && <h3></h3>}
    </>
}