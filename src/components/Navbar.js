import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MenuItem } from '@mui/material';
import {useNavigate} from "react-router-dom"

const pages = ["CreateMedicines", "OpenMedicines", "OpenUserMedicines"]

export default function Navbar({user}){

    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <MenuItem onClick={() => navigate("/")}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Synergy Pharmacy
                    </Typography>
                </MenuItem>
                

                {pages.map((page) => (
                <MenuItem key={page} onClick={() => navigate(`/${page.toLowerCase()}`)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
                ))}
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
                    Synergy Pharmacy
                    </Typography>
                </MenuItem>
                
                {pages.map((page) => (
                <MenuItem key={page} onClick={() => navigate(`/${page.toLowerCase()}`)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
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