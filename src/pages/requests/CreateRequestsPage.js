import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { updateApi } from '../../util/api';
import { getUserById } from '../../util/api';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import ErrorModal from '../../components/ErrorModal';
import { Autocomplete, TextField } from '@mui/material';

export default function CreateRequestsPage({appUser}) {

    const { handleSubmit, control, register } = useForm();
    const [open, setOpen] = useState(false);
    const dosageOptions = [{label:'30', amount:30}, {label:'60', amount:60}, {label:'90', amount:90}];
    const [errorMessage, setErrorMessage] = useState('');
    const [getMedications, setMedication] = useState([]);


    const navigate = useNavigate();

    const handleClose = () => setOpen(false);

    useEffect(() => {
        async function getAllMedicines(){   
            try {
                const { token } = appUser;
                const tokenAPI = updateApi(token);
                const res = await tokenAPI.get("/medications")
                setMedication(res.data.map(medication => ({
                    id:medication.id,
                    label:medication.name
                })))
            } catch(error) {
                console.log(error)
            }
        }
        getAllMedicines();
        }, [appUser]);

    const onSubmit = async (data) => {
        const { username, token } = appUser;
        const userId = await getUserById(username);
        const tokenAPI = updateApi(token);

        try{
            await tokenAPI.post('requests', {
                dosageCount: data.dosageCount.amount,
                dosageFreq: data.DosagePerDay,
                med: {
                    id: data.medication.id
                },
                user : {
                    userId: `${userId}`
                },
            })
            navigate("/home")
        } catch(error) {
            setErrorMessage(error.response.data || 'An error occurred'); // Set error message from response or default
            setOpen(true); // Open the modal
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

    return (
        <Box 
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh', // Ensure the parent container takes up the full height of the viewport
        }}
    >
        <Box 
            sx={{
                minWidth: 700,
                maxWidth: 700,
                height: 'auto',
                minHeight: 320,
                backgroundColor: '#272727',
                margin: 5,
                padding: 2,
                textAlign:"center",
                flexDirection: 'column',
                display: 'flex',
                alignItems: 'center',
                border: '1px solid orange',
                maxHeight: 'auto',
                
                '&:hover': {
                    backgroundColor: 'black',
                    opacity: [0.9, 0.8, 0.95],
                    border: '1px solid white'
                },
            }}>
            <form id="test" onSubmit={handleSubmit(onSubmit, onError)}>
                <h1 style={{color:'white'}}>Refill Request: </h1>
                <div>
                <hr
                    style={{
                        width: 'auto', // Makes the <hr> fill the entire width of the parent
                        borderColor: 'orange',
                        borderWidth: '2px', // Thickness of the line
                        borderStyle: 'solid', // Line style
                        margin: '16px 0' // Vertical spacing around the <hr>
                    }}
                />
                </div>
                <h3 style={{color:'white'}}>Select your Medication: </h3>
                <div>
                <Controller
                    name="medication"
                    control={control}
                    defaultValue={null} // Ensure default value is set
                    rules={{ required: "Medication is required." }}
                    render={({ field }) => (
                        <Autocomplete
                        {...field}
                        disablePortal
                        options={getMedications}
                        getOptionLabel={(option) => option.label} // Display label
                        onChange={(event, value) => field.onChange(value)}
                        value={field.value} // Set value on change
                        isOptionEqualToValue={(option, value) => option.id === value?.id} // Custom equality test
                        sx={{
                            alignItems: 'center',
                            width: 300,
                            "& .MuiInputLabel-outlined": {
                            color: "white"
                            },
                            "&:hover .MuiInputLabel-outlined": {
                            color: "orange"
                            },
                            "& .MuiInputLabel-outlined.Mui-focused": {
                            color: "orange"
                            },
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                            color: "orange"
                            },
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "orange"
                            },
                        }}
                        renderInput={(params) => <TextField {...params} label="Medication" />}
                        />
                    )}
                />
                </div>
                <h3 style={{color:'white'}}>Select your Dosage: </h3>
                <Controller
                    name="dosageCount"
                    control={control}
                    defaultValue={null} // Ensure default value is set
                    rules={{ required: "Dosage is required." }}
                    render={({ field }) => (
                        <Autocomplete
                        {...field}
                        disablePortal
                        options={dosageOptions}
                        getOptionLabel={(option) => option.label} // Display label
                        onChange={(event, value) => field.onChange(value)}
                        value={field.value} // Set value on change
                        isOptionEqualToValue={(option, value) => option.amount === value?.amount} // Custom equality test
                        sx={{
                            alignItems: 'center',
                            width: 300,
                            "& .MuiInputLabel-outlined": {
                            color: "white"
                            },
                            "&:hover .MuiInputLabel-outlined": {
                            color: "orange"
                            },
                            "& .MuiInputLabel-outlined.Mui-focused": {
                            color: "orange"
                            },
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                            color: "orange"
                            },
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "orange"
                            },
                        }}
                        renderInput={(params) => <TextField {...params} label="Dosage" />}
                        />
                    )}
                />


                <h3 style={{color:'white'}}>Enter your Dosage Frequency: </h3>
                <TextField
                    id="component-outlined"
                    label="Dosage Frequency"
                    sx={{
                        alignItems: 'center',
                        width: 200,
                        "& .MuiInputLabel-outlined": {
                        color: "white"
                        },
                        "&:hover .MuiInputLabel-outlined": {
                        color: "orange"
                        },
                        "& .MuiInputLabel-outlined.Mui-focused": {
                        color: "orange"
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
                        color: "orange"
                        },
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "orange"
                        },
                    }}
                    {...register("DosagePerDay", {required: true})}
                    />

                <div><p></p></div>
                <hr color="orange"></hr>
                <Button variant="contained" color="warning" size="large" type="submit">Submit</Button>
            </form>
            <ErrorModal open={open}handleClose={handleClose} errorMessage={errorMessage} />
        </Box>
        </Box>
        
    );
}