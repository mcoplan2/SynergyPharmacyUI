import { Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { updateApi } from "../util/api";
import { getUserById } from "../util/api";
import ExpandableCard from "../components/ExpandableCard";

export default function HomePage({appUser}){
    const{ firstName, lastName } = appUser

    const [getNumberRequests, setNumberRequests] = useState('');
    const [getPayments, setPayments] = useState('');
    const [getApprovedRequests, setApprovedRequests] = useState('');

    const calculateRefillDate = (updateDate, dosageCount, dosageFreq) => {
        const parsedDate = new Date(updateDate);
        const refillDate = new Date(parsedDate);
        refillDate.setDate(refillDate.getDate() + (dosageCount / dosageFreq));

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return {
            formattedUpdateDate: parsedDate.toLocaleDateString(undefined, options),
            formattedRefillDate: refillDate.toLocaleDateString(undefined, options),
        };
    };

    useEffect(() => {
        async function getNumberOfRequests(){   
            const { username, token } = appUser;
            const userId = await getUserById(username);
            try {
                const tokenAPI = updateApi(token);
                const res = await tokenAPI.get("/requests/user/"+`${userId}`+"/type/OPEN")
                setNumberRequests(res.data)
            } catch(error) {
                console.log(error)
            }
        }
        getNumberOfRequests();
        }, [appUser]);

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
        }, [appUser]);

        useEffect(() => {
            async function getApprovedRequests(){   
                const { username, token } = appUser;
                const userId = await getUserById(username);
                try {
                    const tokenAPI = updateApi(token);
                    const res = await tokenAPI.get("/payments/userid/"+`${userId}`+"/paystatus/FULLY_PAID")
                    setApprovedRequests(res.data)
                } catch(error) {
                    console.log(error)
                }
            }
            getApprovedRequests();
            }, [appUser]);
    return <>
    <Box
      sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',// This ensures the parent Box takes the full height of the viewport
          maxWidth:'auto',
          minWidth:600,
        }} >
        <Box 
          sx={{
              minWidth: 450,
              minHeight: 180,
              maxHeight: 'auto',
              padding: 2,
              backgroundColor: '#272727',
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
          </Typography>
        </Box>
    </Box>
    {getApprovedRequests.length > 0 ? (
      <Box 
        sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap', // Add this if you want the cards to wrap to the next line when they overflow
            gap: 2, // Add some space between the cards
            justifyContent: 'center',
            alignItems: 'center',
            width: '60%',
            margin: '0 auto'
          }}
      >
        {getApprovedRequests.map((request) => {
        const { formattedUpdateDate, formattedRefillDate } = calculateRefillDate(
          request.updateDate,
          request.reqId.dosageCount,
          request.reqId.dosageFreq
        );
          return (
            <ExpandableCard
              sx={{
                minWidth: 150,
                minHeight: 160,
                maxHeight: 'auto',
                padding: 1,
                backgroundColor: '#272727',
                margin: 1,
                border: '1px solid orange',
                color: "#FFFFFF",
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                maxWidth: '100%',
                '&:hover': {
                  backgroundColor: 'black',
                  opacity: [0.9, 0.8, 0.95],
                  border: '1px solid white'
                },
              }}
              key={request.id}
              title={request.medicationId.name}
              description={request.reqId.dosageCount+' pills -- '+request.reqId.dosageFreq+' daily'}
              extraInfo={'Fill Date: '+formattedUpdateDate+'\n'}
              extraInfo2={formattedRefillDate}
            >
            </ExpandableCard>
          );
        })}
      </Box>
      ) : (
        <p>No approved medication found.</p>
      )}
    </>
}