import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react"
import { Button } from '@mui/material';
import { updateApi } from '../../util/api';
import { getUserById } from '../../util/api';
import {useNavigate} from "react-router-dom"
import ErrorModal from '../../components/ErrorModal';


export default function ApproveDenyRequestsPage({appUser}) {

    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [getRequests, setRequests] = useState('');
    const navigate = useNavigate();

    const handleClose = () => setOpen(false);

    useEffect(() => {
        async function getAllRequests(){   
            const { token } = appUser;
            try {
                const tokenAPI = updateApi(token);
                const res = await tokenAPI.get("/requests/type/OPEN")
                setRequests(res.data)
            } catch(error) {
                console.log(error)
            }
        }
        getAllRequests();
        }, [appUser]);

    const onApproveSubmit = async (request) => {
        // Deconstruct the array of objects
        if(!request[0]){
            setErrorMessage("Please select a refill");
            setOpen(true);
        }
        const {dosageCount, dosageFreq, requestType, id, user, med } = request[0];
        const { username, token } = appUser;
        const userId = await getUserById(username);
        try{
            const tokenAPI = updateApi(token);
            await tokenAPI.post('requests/approve/'+`${userId}`, {
                id: id,
                requestType: requestType,
                dosageCount: dosageCount,
                dosageFreq: dosageFreq,
                user: {
                    userId: user.userId
                },
                med: {
                    id: med.id
                },
            })
        } catch(error) {
            setErrorMessage(error.message);
            setOpen(true);
        }
        
        navigate("/home")
    }

    const onDenySubmit = async (request) => {

        if(!request[0]){
            setErrorMessage("Please select a refill");
            setOpen(true);
        }
        // Deconstruct the array of objects
        const {dosageCount, dosageFreq, requestType, id, user, med } = request[0];
        const { username, token } = appUser;
        const userId = await getUserById(username);
        try{
            const tokenAPI = updateApi(token);
            await tokenAPI.post('requests/deny/'+`${userId}`, {
                id: id,
                requestType: requestType,
                dosageCount: dosageCount,
                dosageFreq: dosageFreq,
                user: {
                    userId: user.userId
                },
                med: {
                    id: med.id
                },
            })
        } catch(error) {
            setErrorMessage(error.message);
            setOpen(true);
        }
        navigate("/home")
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        {
            field: 'firstName',
            headerName: 'First Name',
            width: 150,
            valueGetter: (params) => {
                return params.row.user.firstName;
            }
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            width: 150,
            valueGetter: (params) => {
                return params.row.user.lastName;
            }
        },
        {
            field: 'name',
            headerName: 'Medication',
            width: 150,
            valueGetter: (params) => {
                return params.row.med.name;
            }
        },
        {
            field: 'stock',
            headerName: 'Stock',
            width: 110,
            valueGetter: (params) => {
                return params.row.med.stock;
            }
        },
        {
            field: 'dosageCount',
            headerName: 'Dosage',
            width: 90,
        },
        {
            field: 'dosageFreq',
            headerName: 'Dosage Freq',
            width: 110,
        },
        {
            field: 'requestType',
            headerName: 'Status',
            width: 110,
        },
        ];

  return (
    <Box 
    sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh', // Ensure the parent container takes up the full height of the viewport
    }}
>
    <Box sx={{
        width: 1000,
        height: 420,
        backgroundColor: '#272727',
        margin: 5,
        padding: 2,
        paddingBottom: 15,
        textAlign:"center",
        border: '1px solid orange',
    }}>
        <h4 style={{color:'orange'}}>Refill Admin Panel</h4>
      <DataGrid
        sx={{
            backgroundColor:'#272727',
            border: '1px solid orange',
            '&:hover': {
            backgroundColor: 'black',
            opacity: [0.9, 0.8, 0.95],
            border: '1px solid white'
            }
        
        }}
        rows={getRequests}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = getRequests.filter((request) =>
              selectedIDs.has(request.id),
            );
  
            setSelectedRows(selectedRows);
          }}
      />
      <Button color="success" variant="outlined"
        onClick={() => onApproveSubmit(selectedRows)} sx={{backgroundColor:'black', margin:2}}>Approve</Button>

        <ErrorModal open={open}handleClose={handleClose} errorMessage={errorMessage}/>
    
      <Button color="error" variant="outlined" onClick={() => onDenySubmit(selectedRows)} sx={{backgroundColor:'black'}}>Deny</Button>
    </Box>
    </Box>
    
  );
}