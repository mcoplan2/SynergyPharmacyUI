import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from "react"
import API from '../util/api';
import { Button } from '@mui/material';


export default function ApproveDenyRequestsPage() {

    const [selectedRows, setSelectedRows] = useState([]);
    const [getRequests, setRequests] = useState('');

    useEffect(() => {
        async function getAllRequests(){   
            try {
                const res = await API.get("/requests/type/OPEN")
                setRequests(res.data)
                console.log(res.data)
            } catch(error) {
                console.log(error)
            }
        }
        getAllRequests();
        }, []);

        // TEST APPROVING WITH ONLY REQUEST ID?
        // LINK BUTTONS VIA FUNCTION CALLING APU AND PASSING SELECTEDROWS.ID FOR APPROVE
        // {nestedobject1: {nestedobject2: { name} } }?
    console.log(selectedRows)
    const onApproveSubmit = async (selectedRows) => {
        try{
            await API.post('requests/approve/1', {
                dosageCount: 90,
                dosageFreq: 23,
                creator: {
                    userId: 1
                },
                med: {
                    id: 3
                },
                id: 12
            })
        } catch(error) {
            console.log(error)
        }
    }

    const onDenySubmit = async ({selectedRows}) => {
        try{
            await API.post('requests/deny/11', {
                body: JSON.stringify(selectedRows)
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
    <Box sx={{ height: 500, maxWidth: 1000, minWidth:500, padding:15}}>
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
      <div>
      <Button color="success" variant="outlined" onClick={onApproveSubmit} sx={{backgroundColor:'black'}}>Approve</Button>
      </div>
      <Button color="error" variant="outlined" onClick={()=>console.log({selectedRows})} sx={{backgroundColor:'black'}}>Deny</Button>
    </Box>
  );
}