import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MenuItem, MenuList, Avatar, Stack, Divider, ListItemIcon, ButtonGroup, ListItem, ListItemText} from '@mui/material';
import {useNavigate} from "react-router-dom"
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import { useState } from "react"
import Person2Icon from '@mui/icons-material/Person2';
import LoginIcon from '@mui/icons-material/Login';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PaymentIcon from '@mui/icons-material/Payment';
import MedicationIcon from '@mui/icons-material/Medication';
import DescriptionIcon from '@mui/icons-material/Description';
import { styled, alpha } from '@mui/material/styles';


const requestPages = ["Quick Refill", "Open Refills"]
const paymentPages = ["Outstanding Payments", "Payment History"]
const medicinePages = ["View All Medicine", "View Your Medicine"]
const adminPages = ["All Refills", "All Payments", "Add Medication", "Pending Refills"]

export default function Navbar(appUser){
    

    const username = appUser?.user?.username ?? '';
    const role = appUser?.user?.role ?? '';

    const handleLogout = () => {
        // Perform logout actions here
        window.location.href="/" // Redirect to login page after logout
        
      };


    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDropdown, setSelectedDropdown] = useState(null); 

    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const handleClick = (event, dropState) => {
        setAnchorEl(event.currentTarget);
        setSelectedDropdown(dropState);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavClose = (page) => {
        navigate(`/${selectedDropdown}/${page.toLowerCase().replace(/\s/g, "")}`);
        setAnchorEl(null);
        setSelectedDropdown(null);
    };

    return (
        
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <MenuItem onClick={() => navigate("/home")}> 
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Synergy Pharm
                    </Typography>
                </MenuItem>
              <ButtonGroup
                variant='text'
                size='large'
               >
                { (role === 'EMPLOYEE' || role === 'CUSTOMER') &&
                <Button
                    variant="text"
                    disableElevation
                    onClick={(e)=>{handleClick(e, "refills");}}
                    endIcon={<KeyboardArrowDownIcon />}
                    startIcon={<DescriptionIcon />}
                    sx={{height:60}}
                    color="warning"
                >
                    Refills
                </Button>
                }
                

                {selectedDropdown === "refills" &&
                    <StyledMenu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                    {requestPages.map((page) => (
                    <MenuList 
                      key={page} 
                      onClick={() => (handleNavClose(page)) 
                    } 
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding:2,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, .25)',
                      },
                    }}
                  >
                      <Typography textAlign="left">{page}</Typography>
                    </MenuList>
                    ))}
                    
                    </StyledMenu>
                }
                
                {/* -----------------------------------------------------------------------------------*/}
                {/* Button Section for payments                                                        */}
                {/* -----------------------------------------------------------------------------------*/}
                { (role === 'EMPLOYEE' || role === 'CUSTOMER') &&
                <Button
                    variant="text"
                    disableElevation
                    onClick={(e) =>{handleClick(e, "payments")}}
                    endIcon={<KeyboardArrowDownIcon />}
                    startIcon={<PaymentIcon />}
                    color="warning"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    Payments
                </Button>
                }

                {selectedDropdown === "payments" &&
                    <StyledMenu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                    {paymentPages.map((page) => (
                    <MenuList key={page} onClick={() => navigate(handleNavClose(page))} 
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding:2,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, .25)',
                        },
                      }}
                    >
                        <Typography textAlign="left">{page}</Typography>
                    </MenuList>
                    ))}
                    
                    </StyledMenu>
                }       

                {/* -----------------------------------------------------------------------------------*/}
                {/* Button Section for medicines                                                        */}
                {/* -----------------------------------------------------------------------------------*/}
                { (role === 'EMPLOYEE' || role === 'CUSTOMER') &&
                <Button
                    variant="text"
                    disableElevation
                    onClick={(e) => {handleClick(e, "medicines")}}
                    endIcon={<KeyboardArrowDownIcon />}
                    startIcon={<MedicationIcon />}
                    color="warning"
                >
                    Medication
                </Button>
                }

                {selectedDropdown === "medicines" &&
                    <StyledMenu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                    {medicinePages.map((page) => (
                    <MenuList key={page} onClick={() => navigate(handleNavClose(page))}

                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding:2,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, .25)',
                        },
                      }}
                    >
                        <Typography textAlign="left">{page}</Typography>
                    </MenuList>
                    ))}
                    
                    </StyledMenu>
                }

                {/* -----------------------------------------------------------------------------------*/}
                {/* Button Section for admins                                                        */}
                {/* -----------------------------------------------------------------------------------*/}
            { role === 'EMPLOYEE' &&  
                <Button
                    variant="text"
                    onClick={(e) => {handleClick(e, "admin")}}
                    endIcon={<KeyboardArrowDownIcon />}
                    startIcon={<SupervisorAccountIcon />}
                    color="error"
                    sx={{flexGrow:1}}
                >
                    Admin
                </Button>
            }
                {selectedDropdown === "admin" &&
                    <StyledMenu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                    {adminPages.map((page) => (
                    <MenuList key={page} onClick={() => navigate(handleNavClose(page))} 
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      padding:2,
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, .25)',
                      },
                    }}
                  >
                      <ListItem>
                          <ListItemText>{page}</ListItemText>
                      </ListItem>
                    </MenuList>
                    ))}
                    
                    </StyledMenu>
                }
                </ButtonGroup>
            
                <ButtonGroup
                  variant='text'
                  size='large'
                  sx={{ marginLeft: 'auto'  }}
                >
               
                
                    {username ? ( 
                          <Button
                            variant="text"
                            color="secondary"
                            startIcon={<Person2Icon/>}
                            onClick={() => navigate("user/editprofile")}
                          >
                            Profile
                          </Button>
                          ) : '' 
                    }

                    {username ? (
                        <Button
                          variant="text"
                          color="primary"
                          startIcon={<LogoutOutlinedIcon/>}
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                        ) : (
                        <Button
                          variant="text"
                          color="primary"
                          startIcon={<LoginIcon/>}
                          onClick={() => navigate("/")}
                        >
                          Login
                        </Button>
                    )}


                </ButtonGroup>

        
                </Toolbar>
            </AppBar>
        </Box>
    )
}

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
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.secondary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));