import { useEffect, useState } from "react"
import Medicine from "../../components/Medicine";
import { getUserById } from "../../util/api";
import { updateApi } from "../../util/api";


export default function OpenUserMedicinesPage({appUser}){

    const [getMedicines, setMedicines] = useState('');

    useEffect(() => {
        const { username, token } = appUser;
        const userId = getUserById(username);
        async function getAllMedicines(){   
            try {
                const tokenAPI = updateApi(token);
                const res = await tokenAPI.get("/medicines/user/" +`${userId}`)
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