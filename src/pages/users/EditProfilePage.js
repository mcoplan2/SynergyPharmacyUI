import LoginForm from "../../components/LoginForm";
import RegistrationForm from "../../components/RegistrationForm";
import { useState } from "react";
import {Card, Stack, Tab, Tabs} from "@mui/material";
import EditProfile from "../../components/EditProfile";


export default function EditProfilePage({updateError, appUser}){
    console.log("TEST??")
    console.log(appUser)

    return <>
        <Stack container={"true"} direction={"column"} alignItems={"center"} justifyContent={"center"} paddingTop={10}>
            <Stack item={"true"} width={1/3}>
                <Card sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems:"center", 
                    backgroundColor: '#272727',
                    margin: 1,
                    border: '1px solid orange',
                    color: "#FFFFFF",
                    '&:hover': {
                    backgroundColor: 'black',
                    opacity: [0.9, 0.8, 0.95],
                    border: '1px solid white'
            },
                    
                    }}>
                <Tabs
                    value={0} 
                    sx={{
                        width: '100%',
                        '& .MuiTab-root': { 
                            color: 'orange', // Default text color
                            backgroundColor: '#616161', // Default background color
                        '&.Mui-selected': { 
                            color: 'orange', // Selected text color
                            backgroundColor: '#212121', // Selected background color
                         },
                         },
                        '& .MuiTabs-indicator': { backgroundColor: 'orange' }, // Indicator color
                      }}
                    textColor="orange" 
                    indicatorColor="orange" 
                    variant="fullWidth" 
                    aria-label={"Edit Profile"}>
                        
                        <Tab label="Edit Profile" />
                </Tabs>
                <TabPanel value={0} index={0}>
                    <EditProfile updateError={updateError} appUser={appUser}/>
                </TabPanel>
                </Card>
            </Stack>
        </Stack>
    </>
}

function TabPanel(props){
    const {children, value, index, ...other} = props;

    return <>
        <div role={"tabpanel"}
             hidden={value !== index}
             id={`tabpanel-${index}`}
             aria-label={`tab-${index}`}
             {...other}>
            {value === index && children}
        </div>
    </>
}