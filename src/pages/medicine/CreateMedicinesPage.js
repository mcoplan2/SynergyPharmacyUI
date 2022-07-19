import React from 'react';
import { useForm } from 'react-hook-form';
import Paper from '@mui/material/Paper';
//import SelectMedicationsMenu from '../components/SelectMedicationsMenu';
import API from '../../util/api';
import Button from '@mui/material/Button';
import { color } from '@mui/system';

export default function CreateMedicinesPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log(errors);

    const onSubmit = async (data) => {
        try{
            await API.post('requests', {
                amountInStock: data.AmountInStock,
                pricePerUnit: data.PricePerUnit,
                type: data.Type,
                status: data.Status,
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
        <Paper elevation={10}  sx={{ margin:3, maxWidth: 600, minHeight:230, backgroundColor: 'black', textAlign: "center"}}>
            <form id="test" onSubmit={handleSubmit(onSubmit)}>
                <h2>Create a Medication</h2>
                <div>
                    <input type="text" placeholder="Medication Name" {...register("Medication Name", { required: true })} />
                </div>
                <div>
                    <input type="text" placeholder="Amount In Stock" {...register("Amount In Stock", { required: true })} />
                </div>
                <div>
                    <input type="text" placeholder="Price Per Unit" {...register("Price Per Unit", {required: true})} />
                </div>
                <div>
                    <select {...register("Type", { required: true })}>
                        <option value="Pill">Pill</option>
                        <option value="Liquid">Liquid</option>
                        <option value="Inhaler">Inhaler</option>
                        <option value="Drops">Drops</option>
                    </select>
                </div>
                <div>
                    <select {...register("Status", { required: true })}>
                        <option value="Instock">Instock</option>
                        <option value="Out of Stock">Out Of Stock</option>
                        <option value="Running Low">Running Low</option>
                    </select> 
                </div>
                <br></br>
                <div>
                    <Button variant="contained" color="warning" size="small" type="submit">Submit</Button>
                </div>
            </form>
        </Paper>
    );
}