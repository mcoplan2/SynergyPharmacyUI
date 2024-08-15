import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ButtonGroup } from '@mui/material';
import {useNavigate} from "react-router-dom"


const ExpandableCardNoDate = ({ title, description, extraInfo, extraInfo2 }) => {
    const [hovered, setHovered] = useState(false);

    const navigate = useNavigate();
    


    return (
        <Card 
            sx={{
                minWidth: 300,
                maxWidth: 500,
                margin: 2,
                transition: 'all 0.2s ease-in-out',
                border: '1px solid orange',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                boxShadow: hovered ? '0 8px 16px rgba(0,0,0,0.2)' : 'none',
                '&:hover': {
                    backgroundColor: '#333',
                    color: '#fff',
                    border: '1px solid white'
                }
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <CardContent>
                {!hovered && (
                    <>
                        <Typography color="white" variant="h5" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </>



                )}
                
                {hovered && (
                    <>
                        <Typography color="orange" variant="h4" component="div">
                            {title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {description}
                        </Typography>
                        <p></p>
                        <Typography variant="body1" component="div">
                            {extraInfo}
                        </Typography>

                        <Typography variant="body1" component="div">
                            Status: {extraInfo2}
                        </Typography>

                    

                    </>
                )}
            </CardContent>
            
        </Card>
    );
}

export default ExpandableCardNoDate;