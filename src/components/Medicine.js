import React from 'react';
import { Box, Typography } from "@mui/material";


export default function Medicine({medicine}) {


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
        <hr color="orange"></hr>
        <p></p>
        <Typography align={"center"} >
            <b>Medication: </b>{medicine.name}
        </Typography>
        <p></p>
        <Typography align={"center"} >
            <b>Amount In Stock:</b> {medicine.stock}
        </Typography>
        <p></p>
        <Typography align={"center"} >
            <b>Price Per Unit:</b> {medicine.price}
        </Typography>
        <p></p>
        <Typography align={"center"} >
            <b>Type:</b> {medicine.type}
        </Typography>
        <p></p>
        <Typography align={"center"} >
            <b>Status:</b> {medicine.status}
        </Typography>
        <hr color="orange"></hr>
            
    </Box>
  )
        
}