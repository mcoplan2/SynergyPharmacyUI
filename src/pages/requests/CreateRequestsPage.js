import React from 'react';
import { useForm } from 'react-hook-form';
import SelectMedicationsMenu from '../../components/SelectMedicationsMenu';
import { updateApi } from '../../util/api';
import { getUserById } from '../../util/api';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import ErrorModal from '../../components/ErrorModal';

export default function CreateRequestsPage({appUser}) {

    const { register, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { username, token } = appUser;
        const userId = await getUserById(username);
        const tokenAPI = updateApi(token);
        try{
            await tokenAPI.post('requests', {
                dosageCount: data.DosageCount,
                dosageFreq: data.DosagePerDay,
                med: {
                    id: data.Medication
                },
                creator : {
                    userId: `${userId}`
                },
            })

        } catch(error) {
            console.log(error)
        }
        navigate("/home")
    }

    const onError = (errors) => {
        // Extract error message
        const errorKeys = Object.keys(errors);
        if (errorKeys.length > 0) {
            setErrorMessage(`Please fill out the required fields: ${errorKeys.join(', ')}`);
            setOpen(true);
        }
    };

    const handleClose = () => setOpen(false);

    return (
        <Box 
            sx={{
                width: 650,
                height: 420,
                backgroundColor: '#272727',
                margin: 5,
                padding: 2,
                textAlign:"center",
                border: '1px solid orange',
                '&:hover': {
                    backgroundColor: 'black',
                    opacity: [0.9, 0.8, 0.95],
                    border: '1px solid white'
                },
            }}>
            <form id="test" onSubmit={handleSubmit(onSubmit, onError)}>
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
            <ErrorModal open={open}handleClose={handleClose} errorMessage={errorMessage} />
        </Box>
        
    );
}