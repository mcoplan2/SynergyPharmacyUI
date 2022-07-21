import React from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import { updateApi } from '../../util/api';
import Button from '@mui/material/Button';


export default function CreateMedicinesPage({appUser}) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log(errors);

    const onSubmit = async (data) => {
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
    
    return (
        <Box 
            sx={{
                width: 650,
                height: 320,
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
                <h2 style={{color:'white'}}>Add a Medication</h2>
                <div>
                    <input type="text" placeholder="Medication Name" {...register("MedicationName", { required: true })} />
                </div>
                <div>
                    <input type="text" placeholder="Amount In Stock" {...register("AmountInStock", { required: true })} />
                </div>
                <div>
                    <input type="text" placeholder="Price Per Unit" {...register("PricePerUnit", {required: true})} />
                </div>
                <div>
                    <select {...register("Type", { required: true })}>
                        <option value="PILL">PILL</option>
                        <option value="LIQUID">LIQUID</option>
                        <option value="INHALERS">INHALERS</option>
                        <option value="DROPS">DROPS</option>
                    </select>
                </div>
                <div>
                    <select {...register("Status", { required: true })}>
                        <option value="IN_STOCK">Instock</option>
                        <option value="OUT_OF_STOCK">Out Of Stock</option>
                        <option value="RUNNING_LOW">Running Low</option>
                    </select> 
                </div>
                <br></br>
                <div>
                    <Button variant="contained" color="warning" size="small" type="submit">Submit</Button>
                </div>
            </form>
        </Box>
    );
}