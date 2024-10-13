import React from 'react';
import { Box, Typography } from "@mui/material";
import ExpandableCardNoDate from './ExpandableCardNoDate';


export default function Medication({medication}) {

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
      title={medication.name}
      description={medication.stock+' in stock $'+medication.price+' per pill'}
      extraInfo={'Type: '+ medication.type}
      extraInfo2={medication.status}
      >

        
    </ExpandableCardNoDate>
    </Box>
  )
        
}