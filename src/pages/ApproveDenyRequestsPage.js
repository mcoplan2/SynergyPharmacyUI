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
                const res = await API.get("/requests")
                setRequests(res.data)
            } catch(error) {
                console.log(error)
            }
        }
        getAllRequests();
        }, []);

    
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First Name',
            width: 150,
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            width: 150,
        },
        {
            field: 'dosageCount',
            headerName: 'Dosage',
            width: 150,
        },
        {
            field: 'dosageFreq',
            headerName: 'Dosage Frequency',
            width: 150,
        },
        {
            field: 'requestType',
            headerName: 'Status',
            type: 'number',
            width: 110,
        },
        ];

  return (
    <Box sx={{ height: 500, maxWidth: 800, minWidth:400, padding:15}}>
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
      <Button color="success" variant="outlined" onClick={()=> {console.log(selectedRows)}} sx={{backgroundColor:'black'}}>Approve</Button>
      </div>
      <Button color="error" variant="outlined" onClick={()=> {console.log(selectedRows)}} sx={{backgroundColor:'black'}}>Deny</Button>
    </Box>
  );
}