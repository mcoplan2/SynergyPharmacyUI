import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const ExpandableCard = ({ title, description, extraInfo, extraInfo2 }) => {
    const [hovered, setHovered] = useState(false);

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
                            {extraInfo2}
                        </Typography>
                    </>
                )}
            </CardContent>
            
        </Card>
    );
}

export default ExpandableCard;