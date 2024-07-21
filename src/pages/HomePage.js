import {Link} from "react-router-dom";
import RequestForm from "../components/SelectMedicationsMenu";
import { Paper, Typography, Stack, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { updateApi } from "../util/api";
import { getUserById } from "../util/api";
import { get } from "react-hook-form";

export default function HomePage({appUser}){
    const{ username, password, firstName, lastName } = appUser
    console.log(appUser)

    const [getNumberRequests, setNumberRequests] = useState('');
    const [getPayments, setPayments] = useState('');
    const [getApprovedRequests, setApprovedRequests] = useState('');

    useEffect(() => {
        async function getNumberOfRequests(){   
            const { username, token } = appUser;
            const userId = await getUserById(username);
            try {
                const tokenAPI = updateApi(token);
                const res = await tokenAPI.get("/requests/user/"+`${userId}`+"/type/OPEN")
                setNumberRequests(res.data)
                console.log(res.data)
            } catch(error) {
                console.log(error)
            }
        }
        getNumberOfRequests();
        }, []);

    useEffect(() => {
        async function getAllPayments(){   
            const { username, token } = appUser;
            const userId = await getUserById(username);
            try {
                const tokenAPI = updateApi(token);
                const res = await tokenAPI.get("/payments/userid/"+`${userId}` + "/paystatus/UNPAID")
                setPayments(res.data)
            } catch(error) {
                console.log(error)
            }
        }
        getAllPayments();
        }, []);

        useEffect(() => {
            async function getApprovedRequests(){   
                const { username, token } = appUser;
                const userId = await getUserById(username);
                try {
                    const tokenAPI = updateApi(token);
                    const res = await tokenAPI.get("/requests/user/"+`${userId}`+"/type/APPROVED")
                    setApprovedRequests(res.data)
                    console.log(getApprovedRequests)
                } catch(error) {
                    console.log(error)
                }
            }
            getApprovedRequests();
            }, []);

    return <>
        <Box 
    sx={{
        width: 600,
        height: 400,
        backgroundColor: 'black',
        margin: 5,
        border: '1px solid orange',
        color: "#FFFFFF",
        '&:hover': {
            backgroundColor: 'black',
            opacity: [0.9, 0.8, 0.95],
            border: '1px solid white'
        },
    }}>
        <Typography >
            Welcome {firstName}, {lastName}
        </Typography>
        <hr color="orange"></hr>

        <Typography align={"center"} >
        You currently have {getNumberRequests.length} Pending Refills
        <p></p>
        You currently have {getPayments.length} Outstanding Payments

        {(getPayments.length > 0) && <p>
        In order to recieve your medication you need to pay the balance
        </p>
        }
        <p></p>
        <hr color="orange"></hr>
        Here is a list of your current medication:
        {getApprovedRequests.length > 0 ? (
        <ul>
          {getApprovedRequests.map((request) => (
            <li key={request.id}>
              <strong>{request.med.name}</strong>: {request.dosageCount} qty
            </li>
          ))}
        </ul>
      ) : (
        <p>No approved medication found.</p>
      )}

        
        </Typography>

    </Box>
    </>
}