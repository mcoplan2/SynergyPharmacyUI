import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MenuItem, MenuList } from '@mui/material';
import {useNavigate} from "react-router-dom"
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import { useState } from "react"

const requestPages = ["Quick Refill", "Your Open Refills", "Your Approved Refills", "All Open Refills", "Admin"]

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
        navigate(`/refills/${page.toLowerCase().replace(/\s/g, "")}`);
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
                    Refills
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                {requestPages.map((page) => (
                <MenuList key={page} onClick={() => (handleNavClose(page))}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuList>
                ))}
                
                </Menu>
                
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
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                {requestPages.map((page) => (
                <MenuList key={page} onClick={() => navigate(handleNavClose(page))}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuList>
                ))}
                
                </Menu>

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
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                {requestPages.map((page) => (
                <MenuList key={page} onClick={() => navigate(handleNavClose(page))}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuList>
                ))}
                
                </Menu>

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
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                {requestPages.map((page) => (
                <MenuList key={page} onClick={() => navigate(handleNavClose(page))}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuList>
                ))}
                
                </Menu>
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