import React from 'react';
import API from "../util/api"
import { useEffect, useState } from "react"

export default function RequestForm() {
    
  const [getMedications, setMedication] = useState([]);

useEffect(() => {
    async function getAllMedicines(){   
        try {
            const res = await API.get("/medicines")
            setMedication(res.data)
        } catch(error) {
            console.log(error)
        }
    }
    getAllMedicines();
    }, []);

  return (
        getMedications.map((medication) => (
        <option key={medication.id} value={medication.id}>
            {medication.name}
        </option>
        ))    
  );
}