import { useEffect, useState } from "react"
import { updateApi, getUserById } from '../../util/api';
import { Box } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

export default function PaymentHistoryPage({appUser}){
    const [getPayments, setPayments] = useState('');

    useEffect(() => {
        async function getAllPayments(){   
            const { username, token } = appUser;
            const userId = await getUserById(username);
            try {
                const tokenAPI = updateApi(token);
                const res = await tokenAPI.get("/payments/userid/" + `${userId}` + "/paystatus/FULLY_PAID")
                setPayments(res.data)
            } catch(error) {
                console.log(error)
            }
        }
        getAllPayments();
        }, [appUser]);

        const columns = [
            { field: 'paymentId', headerName: 'Payment ID', width: 120 },
            {
                field: 'firstName',
                headerName: 'First Name',
                width: 120,
                valueGetter: (params) => {
                    return params.row.reqId.user.firstName;
                }
            },
            {
                field: 'lastName',
                headerName: 'Last Name',
                width: 120,
                valueGetter: (params) => {
                    return params.row.reqId.user.lastName;
                }
            },
            {
                field: 'name',
                headerName: 'Medication',
                width: 120,
                valueGetter: (params) => {
                    return params.row.medicationId.name;
                }
            },
            {
                field: 'receipt',
                headerName: 'Receipt Date',
                width: 120,
                valueGetter: (params) => {
                    return params.row.updateDate;
                }
            },
            {
                field: 'amount',
                headerName: 'Amount Paid',
                width: 120,
                valueGetter: (params) => {
                    return "$"+params.row.amount;
                }
            },
            {
                field: 'invoice',
                headerName: 'Invoice Date',
                width: 120,
                valueGetter: (params) => {
                    return params.row.creationDate;
                }
            },
            {
                field: 'status',
                headerName: 'Payment Status',
                width: 120,
                valueGetter: (params) => {
                    return params.row.payStatus;
                }
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
            <h4 style={{color:'orange'}}>Payments</h4>
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
            getRowId={(row) => row.paymentId}
            rows={getPayments}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
           
          />
        </Box>
        </Box>
        
      );
}