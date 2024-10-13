import { Button } from "@mui/material"
import Box from "@mui/material/Box"
import {useNavigate} from "react-router-dom"
import Typography from "@mui/material/Typography"
import { useState } from "react";
import { updateApi } from '../util/api';

export default function Payment({payment, payable, appUser}){
    const [visiableFlashCard, setVisiableFlashCard] = useState(true);

    const navigate = useNavigate();

    const payPayment = async () => {
        setVisiableFlashCard(false)

        const { token } = appUser;
        try{
            const tokenAPI = updateApi(token);
            tokenAPI.post('payments/update', {
                paymentId: payment.paymentId,
                amount: payment.amount,
                medicationId: {
                    id: payment.medicationId.id
                },
                payStatus: "FULLY_PAID",
                user:{
                    userId: payment.user.userId
                },
                reqId:{
                    id: payment.reqId.id
                },}
            )

        } catch(error) {
            console.log(error)
        }
        navigate("/home")
    }

    const cancelPayment = async () => {
        setVisiableFlashCard(false)
        navigate("/home")
    }


    

console.log(payment);

  return (
    <>
    {visiableFlashCard &&
        <Box 
        sx={{
            width: 600,
            height: 270,
            backgroundColor: '#272727',
            margin: 5,
            padding: 2,
            border: '1px solid orange',
            color: "#FFFFFF",
            '&:hover': {
                backgroundColor: 'black',
                opacity: [0.9, 0.8, 0.95],
                border: '1px solid white'
            },
        }}>
            <Typography >
                {payment.user.firstName} {payment.user.lastName}
            </Typography>
            <hr color="orange"></hr>
            <p></p>
            {payment.creationDate && 
                <Typography> 
                Invoice Date:  {payment.creationDate}
                </Typography>
            }
            <Typography >
                {payment.medicationId.name}:      
                ${payment.medicationId.price.toFixed(2)} per dosage <br/>
                {payment.reqId.dosageCount} doses
            </Typography>
            <hr color="orange"></hr>
            <p></p>
            <Typography >
                
            <><br/><Typography>Total: ${payment.amount.toFixed(2)}</Typography></>
            </Typography>


            {payable ?
                <>
                    <br/>
                    <Button onClick={payPayment}>Purchase</Button>
                    <Button onClick={cancelPayment}>Cancel</Button>
                </>
                :
                <><br/><Typography>Payment Date:  {payment.updateDate}</Typography></>

            }
        </Box>
    }
    </>
  )
  
}