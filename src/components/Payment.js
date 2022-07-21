import { Button } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react";
import { updateApi, getUserById } from '../util/api';

export default function Payment({payment, payable, appUser}){
    const v = {
        paymentId: payment.paymentId,
        amount: payment.amount,
        medicineId: {
            id: payment.medicineId.id
        },
        payStatus: "FULLY_PAID",
        userId:{
            userId: payment.userId.userId
        },
        reqId:{
            id: payment.reqId.id
        },}

    const payPayment = async () => {
        const { username, token } = appUser;
        const userId = await getUserById(username);
        try{
            const tokenAPI = updateApi(token);


            console.log(v)
            tokenAPI.post('payments/update', v
            )

        } catch(error) {
            console.log(error)
        }
    }


    



  return (
    <Box 
    sx={{
        width: 450,
        height: 235,
        backgroundColor: 'black',
        margin: 5,
        border: '1px solid orange',
        color: "#FFFFFF",
        '&:hover': {
            backgroundColor: 'black',
            opacity: [0.9, 0.8, 0.95],
            border: '1px solid white'
        },
    }}>
        <Typography >
            {payment.userId.username}
        </Typography>
        <hr color="orange"></hr>
        <p></p>
        <Typography >
            {payment.medicineId.name} <br/>
            ${payment.medicineId.price.toFixed(2)} per dosage <br/>
            {payment.reqId.dosageCount} doses
        </Typography>
        <hr color="orange"></hr>
        <p></p>
        <Typography >
            Amount: ${payment.amount.toFixed(2)}
        </Typography>

        {payable &&
            <>
                <br/>
                <Button onClick={payPayment}>Submit</Button>
            </>
        }
    </Box>
  )
}