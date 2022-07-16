import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import API from "../util/api"
import { useEffect, useState } from "react"

export default function RequestForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);


  const [getMedications, setMedication] = useState([]);
  const [selectedmeds, setSelectedMed] = useState('')

  const handleChange = (event) => {
    setSelectedMed(event.target.value);
  };

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

console.log(getMedications)
  return (
        <Box component="form" bgcolor="primary.main" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }, minWidth:100, maxWidth:800}} noValidateautoComplete="off" onSubmit={handleSubmit(onSubmit)} >
      <div>
        <TextField required id="outlined-required" label="Required" defaultValue="Hello World"/>
        <TextField required id="outlined-required" label="Required" defaultValue="Hello World"/>
        <TextField id="filled-number" label="Number" type="number" InputLabelProps={{shrink: true,}} variant="filled"/>
        <FormControl fullWidth>
        <InputLabel required id="outlined-required">Medication</InputLabel>
        <Select
          value={selectedmeds}
          label="Medication"
          onChange={handleChange}
        >

        {getMedications.map((medication) => (
        <MenuItem key= {medication.id} value={medication.id}>
            {medication.name}
        </MenuItem>
        ))}
        
        </Select>
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </FormControl>
        
      </div>
    </Box>
  );
}