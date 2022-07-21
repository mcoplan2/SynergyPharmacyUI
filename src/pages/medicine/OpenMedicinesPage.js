import { useEffect, useState } from "react"
import Medicine from "../../components/Medicine";
import { updateApi } from "../../util/api";

// THIS WILL EVENTUALLY BE ADMIN ONLY
export default function OpenMedicinesPage({appUser}){

    const [getMedicines, setMedicines] = useState('');

    useEffect(() => {
        async function getAllMedicines(){
            const { token } = appUser;
            const tokenAPI = updateApi(token);
            try {
                const res = await tokenAPI.get("/medicines")
                setMedicines(res.data)
            } catch(error) {
                console.log(error)
            }
        }
        getAllMedicines();
        }, []);

        console.log(getMedicines)
    return <>
        {getMedicines && getMedicines.map((medicine) => 
            <Medicine key={medicine.id} medicine={medicine} />
        )}

        {!getMedicines && <h3>Loading Medicines...</h3>}
    </>
}