import React from 'react';
import { Paper, Typography, Stack, Box } from "@mui/material";
import ExpandableCard from './ExpandableCard';
import ExpandableCardNoDate from './ExpandableCardNoDate';


export default function Request({request}) {
    

  return (
    <Box
      sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',// This ensures the parent Box takes the full height of the viewport
          maxWidth:'auto',
          minWidth:600,
        }} >
    <ExpandableCardNoDate
        sx={{
            width: 450,
            height: 235,
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
        }}
            title={request.med.name}
            description={request.creator.firstName+' '+request.creator.lastName}
            extraInfo={request.dosageCount+' pills -- '+request.dosageFreq+' daily '}
            extraInfo2={request.requestType}
        >

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
    </ExpandableCardNoDate>
    </Box>
  )
        
}