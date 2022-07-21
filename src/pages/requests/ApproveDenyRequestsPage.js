import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react"
import { Button } from '@mui/material';
import { updateApi } from '../../util/api';
import { getUserById } from '../../util/api';


export default function ApproveDenyRequestsPage({appUser}) {

    const [selectedRows, setSelectedRows] = useState([]);
    const [getRequests, setRequests] = useState('');

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
        }, []);

    const onApproveSubmit = async (request) => {
        // Deconstruct the array of objects
        const {dosageCount, dosageFreq, requestType, id, creator, med } = request[0];
        const { username, token } = appUser;
        const userId = await getUserById(username);
        try{
            const tokenAPI = updateApi(token);
            await tokenAPI.post('requests/approve/'+`${userId}`, {
                id: id,
                requestType: requestType,
                dosageCount: dosageCount,
                dosageFreq: dosageFreq,
                creator: {
                    userId: creator.userId
                },
                med: {
                    id: med.id
                },
            })
        } catch(error) {
            console.log(error)
        }


        try{
            const tokenAPI = updateApi(token);
            await tokenAPI.post('payments', {
                amount: `${dosageCount * med.price}`,
                medicineId: {
                    id: med.id
                },
                payStatus: "UNPAID",
                userId:{
                    userId: creator.userId
                },
                reqId:{
                    id: id
                },
            })
        } catch(error) {
            console.log(error)
        }
    }

    const onDenySubmit = async (request) => {
        // Deconstruct the array of objects
        const {dosageCount, dosageFreq, requestType, id, creator, med } = request[0];
        const { username, token } = appUser;
        const userId = await getUserById(username);
        try{
            const tokenAPI = updateApi(token);
            await tokenAPI.post('requests/deny/'+`${userId}`, {
                id: id,
                requestType: requestType,
                dosageCount: dosageCount,
                dosageFreq: dosageFreq,
                creator: {
                    userId: creator.userId
                },
                med: {
                    id: med.id
                },
            })
        } catch(error) {
            console.log(error)
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        {
            field: 'firstName',
            headerName: 'First Name',
            width: 150,
            valueGetter: (params) => {
                return params.row.creator.firstName;
            }
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            width: 150,
            valueGetter: (params) => {
                return params.row.creator.lastName;
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
    <Box sx={{
        width: 900,
        height: 420,
        backgroundColor: 'black',
        margin: 15,
        padding: 2,
        paddingBottom: 15,
        textAlign:"center",
        border: '1px solid orange',
        '&:hover': {
            backgroundColor: 'black',
            opacity: [0.9, 0.8, 0.95],
            border: '1px solid orange'
        },
    }}>
        <h4 style={{color:'white'}}>Refill Admin Panel</h4>
      <DataGrid
        sx={{backgroundColor:'black'}}
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
      
      <Button color="error" variant="outlined" onClick={() => onDenySubmit(selectedRows)} sx={{backgroundColor:'black'}}>Deny</Button>
    </Box>
  );
}