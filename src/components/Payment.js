import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

export default function Payment({payment}){
    
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
            {payment.userId.firstName} {payment.userId.lastName}
        </Typography>
        <hr color="orange"></hr>
        <p></p>
        <Typography >
            Amount: ${payment.amount}
        </Typography>
        <hr color="orange"></hr>
        <p></p>
    </Box>
  )
}