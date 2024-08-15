import { useEffect, useState } from "react"
import Medicine from "../../components/Medicine";
import { updateApi } from "../../util/api";
import AlphabetFilter from "../../components/AlphabetFilter";

// THIS WILL EVENTUALLY BE ADMIN ONLY
export default function OpenMedicinesPage({appUser}){

    const [getMedicines, setMedicines] = useState('');
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [selectedSearch, setSelectedSearch] = useState('');

    useEffect(() => {
        async function getAllMedicines(){
            const { token } = appUser;
            const tokenAPI = updateApi(token);
            console.log(selectedSearch)

            let query = '';
            if(selectedLetter) {
                query += `letter=${selectedLetter}`
            }
            if(selectedSearch) {
                query += (query ? '&' : '') + `query=${selectedSearch}`
            }
            console.log(query)
            try {
                const res = await tokenAPI.get("/medicines/filter"+`${query ? `?${query}` : ''}`);
                setMedicines(res.data)
            } catch(error) {
                console.log(error)
            }
        }
        getAllMedicines();
        }, [selectedLetter, selectedSearch, appUser]);

    return <>
        <p></p>
        <AlphabetFilter onLetterClick={setSelectedLetter} onSearch={setSelectedSearch} />
        {getMedicines && getMedicines.map((medicine) => 
            <Medicine key={medicine.id} medicine={medicine} />
        )}

        {!getMedicines && <h3>Loading Medicines...</h3>}
    </>
}