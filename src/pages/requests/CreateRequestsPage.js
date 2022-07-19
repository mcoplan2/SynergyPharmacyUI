import React from 'react';
import { useForm } from 'react-hook-form';
import SelectMedicationsMenu from '../../components/SelectMedicationsMenu';
import API from '../../util/api';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';

export default function CreateRequestsPage() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try{
            await API.post('requests', {
                dosageCount: data.DosageCount,
                dosageFreq: data.DosagePerDay,
                med: {
                    id: data.Medication
                },
                creator : {
                    userId: 1
                },
            })
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        <Box 
            sx={{
                width: 650,
                height: 420,
                backgroundColor: 'black',
                margin: 5,
                textAlign:"center",
                border: '1px solid orange',
                '&:hover': {
                    backgroundColor: 'black',
                    opacity: [0.9, 0.8, 0.95],
                    border: '1px solid white'
                },
            }}>
            <form id="test" onSubmit={handleSubmit(onSubmit)}>
                <h1 style={{color:'white'}}>Refill Request: </h1>
                <hr color="orange"></hr>
                <div>
                <h3 style={{color:'white'}}>Select your Medication: </h3>
                <select {...register("Medication", { required: true })}>
                    <SelectMedicationsMenu />
                </select>
                </div>
                <h3 style={{color:'white'}}>Select your Dosage: </h3>
                <select {...register("DosageCount", { required: true })}>
                    <option value="30">30</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                </select>
                <h3 style={{color:'white'}}>Select your Dosage Frequency: </h3>
                <input type="text" placeholder="Dosage Per Day" {...register("DosagePerDay", {required: true})} />
                <div><p></p></div>
                <hr color="orange"></hr>
                <Button variant="contained" color="warning" size="large" type="submit">Submit</Button>
            </form>
        </Box>
        
    );
}