import React from 'react';
import { useForm } from 'react-hook-form';
import Paper from '@mui/material/Paper';
import SelectMedicationsMenu from '../components/SelectMedicationsMenu';
import API from '../util/api';

export default function CreateRequestsPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log(errors);
    const onSubmit = async (data) => {
        console.log(data.DosageCount)
        console.log(data.DosagePerDay)
        console.log(data.Medication)
        try{
            await API.post('requests', {
                dosageCount: data.DosageCount,
                dosageFreq: data.DosagePerDay,
                med: {
                    id: 2
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
        <Paper elevation={10} background-color="red" sx={{ margin:3, maxWidth: 450, minHeight:215}}>
            <form id="test" onSubmit={handleSubmit(onSubmit)}>
                <h2>Create a Request</h2>
                <div>
                    <select {...register("Medication", { required: true })}>
                        <SelectMedicationsMenu />
                    </select>
                </div>
                <div>
                    <select {...register("DosageCount", { required: true })}>
                        <option value="30">30</option>
                        <option value="60">60</option>
                        <option value="90">90</option>
                    </select>
                </div>
                <div>
                    <input type="text" placeholder="Dosage Per Day" {...register("DosagePerDay", {required: true})} />
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
        </Paper>
    );
}