import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MenuItem } from '@mui/material';
import {useNavigate} from "react-router-dom"

const pages = ["CreateRequest", "OpenRequests", "ApprovedUserRequests", "OpenUserRequests"]
//                              object destructuring of the props object
export default function Navbar({user}){

    // What is Conditional Rendering??
    //      Change what is rendered based upon some kind of condition
    // if the user exists render one thing
    // if they don't render something different
    // if(props.user){
    //     return <h1>Hello {props.user.name}!</h1>
    // } else {
    //     return <h1>Please log in!! :D</h1>
    // }
    // Typically, React devs use ternary based conditonal rendering
    //                                  return   <condition> ? <truthy> : <falsey>

    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <MenuItem onClick={() => navigate("/")}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Synergy Pharm
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
            <AppBar position="static">
                <Toolbar>
                <MenuItem onClick={() => navigate("/")}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Synergy Pharm
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