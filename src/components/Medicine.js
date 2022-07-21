import React from 'react';
import { Paper, Typography, Stack } from "@mui/material";


export default function Medicine({medicine}) {
    console.log(medicine)
    

  return (
        <Paper spacing={4} elevation={20} component={Stack} sx={{ margin:3, maxWidth: 450, minHeight:215}}>


        <Typography align={"center"} >
            <b>Medication: </b>{medicine.name}
        </Typography>
        <Typography align={"center"} >
            <b>Amount In Stock:</b> {medicine.stock}
        </Typography>
        <Typography align={"center"} >
            <b>Price Per Unit:</b> {medicine.price}
        </Typography>
        <Typography align={"center"} >
            <b>Type:</b> {medicine.type}
        </Typography>
        <Typography align={"center"} >
            <b>Status:</b> {medicine.status}
        </Typography>
            
    </Paper>
  )
        
}