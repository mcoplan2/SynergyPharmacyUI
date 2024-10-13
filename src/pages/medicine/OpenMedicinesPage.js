import { useEffect, useState } from "react"
import { updateApi } from "../../util/api";
import AlphabetFilter from "../../components/AlphabetFilter";
import Medication from "../../components/Medication";

// THIS WILL EVENTUALLY BE ADMIN ONLY
export default function OpenMedicationPage({appUser}){

    const [getMedication, setMedication] = useState('');
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [selectedSearch, setSelectedSearch] = useState('');

    useEffect(() => {
        async function getAllMedication(){
            const { token } = appUser;
            const tokenAPI = updateApi(token);

            let query = '';
            if(selectedLetter) {
                query += `letter=${selectedLetter}`
            }
            if(selectedSearch) {
                query += (query ? '&' : '') + `query=${selectedSearch}`
            }
            try {
                const res = await tokenAPI.get("/medications/filter"+`${query ? `?${query}` : ''}`);
                setMedication(res.data)
            } catch(error) {
                console.log(error)
            }
        }
        getAllMedication();
        }, [selectedLetter, selectedSearch, appUser]);

    return <>
        <p></p>
        <AlphabetFilter onLetterClick={setSelectedLetter} onSearch={setSelectedSearch} />
        {getMedication && getMedication.map((medication) => 
            <Medication key={medication.id} medication={medication} />
        )}

        {!getMedication && <h3>Loading Medicines...</h3>}
    </>
}