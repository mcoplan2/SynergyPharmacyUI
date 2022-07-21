import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm"
import { useState } from "react";
import {Card, Stack, Tab, Tabs} from "@mui/material";

export default function LoginPage({updateError, updateAppUser}){

    const [selectedTab, updateSelectedTab] = useState(0);


    function handleChange(event, newValue){
        updateSelectedTab(newValue);
    }


    return <>
        <Stack container={"true"} direction={"column"} alignItems={"center"} justifyContent={"center"} paddingTop={10}>
            <Stack item={"true"} width={1/3}>
                <Card sx={{ display: "flex", flexDirection: "column", alignItems:"center", backgroundColor: "#272727"}}>
                    <Tabs value={selectedTab} onChange={handleChange} aria-label={"login/registration tab selection"}>
                        <Tab label={"Login"} />
                        <Tab label={"Register"} />
                    </Tabs>
                    <TabPanel value={selectedTab} index={0}>
                        <LoginForm updateError={updateError} updateAppUser={updateAppUser}/>
                    </TabPanel>
                    <TabPanel value={selectedTab} index={1}>
                        <RegistrationForm updateError={updateError}/>
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