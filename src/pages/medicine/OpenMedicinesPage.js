import { useEffect, useState } from "react"
import Medicine from "../../components/Medicine";
import API from '../../util/api';

// THIS WILL EVENTUALLY BE ADMIN ONLY
export default function OpenMedicinesPage(){

    const [getMedicines, setMedicines] = useState('');

    useEffect(() => {
        async function getAllMedicines(){   
            try {
                const res = await API.get("/medicines/user/1/status/INSTOCK")
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