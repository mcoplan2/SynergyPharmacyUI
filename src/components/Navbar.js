import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MenuItem, MenuList } from '@mui/material';
import {useNavigate} from "react-router-dom"
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import { useEffect, useState } from "react"
import { red } from '@mui/material/colors';

const requestPages = ["CreateRequest", "OpenRequests", "ApprovedUserRequests", "OpenUserRequests", "ApproveDenyRequests"]

const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color: red,
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
     
    },
  }));

export default function Navbar({user}){

    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavClose = (page) => {
        navigate(`/requests/${page.toLowerCase()}`);
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <MenuItem onClick={() => navigate("/")}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Synergy Pharm
                    </Typography>
                </MenuItem>
                
                <Button
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{margin:1}}
                    color="warning"
                >
                    Requests
                </Button>
                <StyledMenu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                {requestPages.map((page) => (
                <MenuList key={page} onClick={() => (handleNavClose(page))}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuList>
                ))}
                
                </StyledMenu>
                
                {/* -----------------------------------------------------------------------------------*/}
                {/* ANOTHER BUTTON SECTION FOR WHATEVER, CHANGE requestPages to whatever your pages are*/}
                {/* -----------------------------------------------------------------------------------*/}
                <Button
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{margin:1}}
                    color="warning"
                >
                    ADD IT HERE
                </Button>
                <StyledMenu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                {requestPages.map((page) => (
                <MenuList key={page} onClick={() => navigate(handleNavClose(page))}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuList>
                ))}
                
                </StyledMenu>

                {/* -----------------------------------------------------------------------------------*/}
                {/* ANOTHER BUTTON SECTION FOR WHATEVER, CHANGE requestPages to whatever your pages are*/}
                {/* -----------------------------------------------------------------------------------*/}
                <Button
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{margin:1}}
                    color="warning"
                >
                    ADD IT HERE
                </Button>
                <StyledMenu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                {requestPages.map((page) => (
                <MenuList key={page} onClick={() => navigate(handleNavClose(page))}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuList>
                ))}
                
                </StyledMenu>

                {/* -----------------------------------------------------------------------------------*/}
                {/* ANOTHER BUTTON SECTION FOR WHATEVER, CHANGE requestPages to whatever your pages are*/}
                {/* -----------------------------------------------------------------------------------*/}
                <Button
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{margin:1}}
                    color="warning"
                >
                    ADD IT HERE
                </Button>
                <StyledMenu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                {requestPages.map((page) => (
                <MenuList key={page} onClick={() => navigate(handleNavClose(page))}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuList>
                ))}
                
                </StyledMenu>
                </Toolbar>
                
            </AppBar>
        </Box>
    )
}

// this component is rendered if the user logged in 
function AuthNavbar(){
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={{backgroundColor: "blue"}}>
                <Toolbar variant="dense">
                <MenuItem onClick={() => navigate("/")}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Synergy Pharm
                    </Typography>
                </MenuItem>
                
                {requestPages.map((page) => (
                <MenuList key={page.submenu} onClick={() => navigate(`/${page.toLowerCase()}`)}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuList>
                ))}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

// this component is rendered if the user is not logged in 
function NoAuthNavbar(){
    return <h1>Please log in!! :D</h1>
}