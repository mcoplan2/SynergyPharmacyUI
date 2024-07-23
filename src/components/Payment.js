import { Button } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react";
import { updateApi, getUserById } from '../util/api';

export default function Payment({payment, payable, appUser}){
    const [visiableFlashCard, setVisiableFlashCard] = useState(true);

    console.log("HELLO!!!!!!!!!!!!!!!!!!!!!")
    console.log(payment.updateDate)
    console.log(payment.creationDate)

    const payPayment = async () => {
        setVisiableFlashCard(false)

        const { username, token } = appUser;
        const userId = await getUserById(username);
        try{
            const tokenAPI = updateApi(token);
            tokenAPI.post('payments/update', {
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
            )

        } catch(error) {
            console.log(error)
        }
    }

    const deletePayment = async () => {
        setVisiableFlashCard(false)

        const { username, token } = appUser;
        const userId = await getUserById(username);
        try{
            const tokenAPI = updateApi(token);
            tokenAPI.delete('payments/update', {
                paymentId: payment.paymentId,
                }
            )

        } catch(error) {
            console.log(error)
        }
    }


    



  return (
    <>
    {visiableFlashCard &&
        <Box 
        sx={{
            width: 600,
            height: 270,
            backgroundColor: '#272727',
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
            {payment.creationDate && 
                <Typography> 
                Approved Date:  {payment.creationDate}
                </Typography>
            }
            <Typography >
                {payment.medicineId.name}:      
                ${payment.medicineId.price.toFixed(2)} per dosage <br/>
                {payment.reqId.dosageCount} doses
            </Typography>
            <hr color="orange"></hr>
            <p></p>
            <Typography >
                Total: ${payment.amount.toFixed(2)}
            </Typography>

            {payable ?
                <>
                    <br/>
                    <Button onClick={payPayment}>Confirm</Button>
                    <Button onClick={deletePayment}>Deny</Button>
                </>
                :
                <><br/><Typography>Confirm Date:  {payment.updateDate}</Typography></>

            }
        </Box>
    }
    </>
  )
  
}