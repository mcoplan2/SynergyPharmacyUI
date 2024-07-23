import React from 'react';
import { Paper, Typography, Stack, Box } from "@mui/material";


export default function Request({request}) {
    

  return (
    <Box 
    sx={{
        width: 450,
        height: 235,
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
            {request.creator.firstName} {request.creator.lastName}
        </Typography>
        <hr color="orange"></hr>
        <p></p>
        <Typography align={"center"} >
            <b>Medication: </b>{request.med.name}
        </Typography>
        <p></p>
        <Typography align={"center"} >
            <b>Dosage:</b> {request.dosageCount}
        </Typography>
        <p></p>
        <Typography align={"center"} >
            <b>Amount Per Day:</b> {request.dosageFreq}
        </Typography>
        <p></p>
        <Typography align={"center"} >
            <b>Status:</b> {request.requestType}
        </Typography>
        <hr color="orange"></hr>
    </Box>
  )
        
}