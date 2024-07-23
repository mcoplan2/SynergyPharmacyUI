import React from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import { updateApi } from '../../util/api';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react"
import ErrorModal from '../../components/ErrorModal';


export default function CreateMedicinesPage({appUser}) {


    const { register, handleSubmit, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    console.log(errors);

    const onSubmit = async (data) => {
        console.log(data)
        const { token } = appUser;
        const tokenAPI = updateApi(token);
        try{
            await tokenAPI.post('/medicines', {
                name: data.MedicationName,
                stock: data.AmountInStock,
                price: data.PricePerUnit,
                type: data.Type,
                status: data.Status,

            })
        } catch(error) {
            console.log(error)
        }
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
                height: 'auto',
                minHeight: 320,
                backgroundColor: '#272727',
                margin: 5,
                padding: 2,
                textAlign:"center",
                border: '1px solid orange',
                maxHeight: 'auto',
                textAlign:"center",
                '&:hover': {
                    backgroundColor: 'black',
                    opacity: [0.9, 0.8, 0.95],
                    border: '1px solid white'
                },
            }}>
            <form id="test" onSubmit={handleSubmit(onSubmit, onError)}>
                <h1 style={{color:'white'}}>Add a Medication: </h1>
                <hr color="orange"></hr>
                <div>
                <h3 style={{color:'white'}}>Medication Name: </h3>
                    <input type="text" placeholder="Medication Name" {...register("MedicationName", { required: true })} />
                </div>
                <div>
                <h3 style={{color:'white'}}>Enter Total Amount: </h3>
                    <input type="text" placeholder="Amount In Stock" {...register("AmountInStock", { required: true })} />
                </div>
                <div>
                <h3 style={{color:'white'}}>Enter Price Per Unit: </h3>
                    <input type="text" placeholder="Price Per Unit" {...register("PricePerUnit", {required: true})} />
                </div>
                <div>
                <h3 style={{color:'white'}}>Choose Type of Medication: </h3>
                    <select {...register("Type", { required: true })}>
                        <option value="PILL">PILL</option>
                        <option value="LIQUID">LIQUID</option>
                        <option value="INHALERS">INHALERS</option>
                        <option value="DROPS">DROPS</option>
                    </select>
                </div>
                <h3 style={{color:'white'}}>Choose Status of Medication: </h3>
                    <select {...register("Status", { required: true })}>
                        <option value="IN_STOCK">Instock</option>
                        <option value="OUT_OF_STOCK">Out Of Stock</option>
                        <option value="RUNNING_LOW">Running Low</option>
                    </select> 
                <div><p></p></div>
                <hr color="orange"></hr>
                    <Button variant="contained" color="warning" size="large" type="submit">Submit</Button>

            </form>

            <ErrorModal open={open}handleClose={handleClose} errorMessage={errorMessage} />
        </Box>
    );
}