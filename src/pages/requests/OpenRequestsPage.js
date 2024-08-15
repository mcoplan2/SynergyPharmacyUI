import { useEffect, useState } from "react"
import Request from "../../components/Request";
import { updateApi } from "../../util/api";
import AlphabetFilter from "../../components/AlphabetFilter";

// THIS WILL EVENTUALLY BE ADMIN ONLY
export default function OpenRequestsPage({appUser}){

    const [getRequests, setRequests] = useState('');
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [selectedSearch, setSelectedSearch] = useState('');

    useEffect(() => {
        async function getAllRequests(){   
            const { username, token } = appUser;

            let query = '';
            if(selectedLetter) {
                query += `letter=${selectedLetter}`
            }
            if(selectedSearch) {
                query += (query ? '&' : '') + `query=${selectedSearch}`
            }
            try {
                const tokenAPI = updateApi(token);
                const res = await tokenAPI.get("/requests/filter"+`${query ? `?${query}` : ''}`)
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

        {!getRequests || getRequests==0 && <h3>No open refills at this time.</h3>}
    </>
}