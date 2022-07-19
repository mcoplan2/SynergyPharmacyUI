import React from 'react';
import { Paper, Typography, Stack } from "@mui/material";


export default function Request({request}) {
    

  return (
    <Paper spacing={4} elevation={20} component={Stack} sx={{ margin:3, maxWidth: 450, minHeight:215}}>
        <Typography >
            {request.creator.firstName} {request.creator.lastName}
        </Typography>

        <Typography align={"center"} >
            <b>Medication: </b>{request.med.name}
        </Typography>
        <Typography align={"center"} >
            <b>Dosage:</b> {request.dosageCount}
        </Typography>
        <Typography align={"center"} >
            <b>Amount Per Day:</b> {request.dosageFreq}
        </Typography>
        <Typography align={"center"} >
            <b>Status:</b> {request.requestType}
        </Typography>     
    </Paper>
  )
        
}