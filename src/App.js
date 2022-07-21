import {Route, Routes, Navigate} from "react-router-dom"
import './App.css';
import Navbar from './components/Navbar'
import HomePage from "./pages/HomePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import CreateMedicinesPage from "./pages/medicine/CreateMedicinesPage";
import OpenMedicinesPage from "./pages/medicine/OpenMedicinesPage";
import OpenUserMedicinesPage from "./pages/medicine/OpenUserMedicinesPage";
import CreateRequestsPage from "./pages/requests/CreateRequestsPage";
import OpenRequestsPage from "./pages/requests/OpenRequestsPage";
import ApprovedUserRequestsPage from "./pages/requests/ApprovedUserRequestsPage";
import OpenUserRequestsPage from "./pages/requests/OpenUserRequestsPage";
import ApproveDenyRequestsPage from "./pages/requests/ApproveDenyRequestsPage";
import OutstandingPaymentsPage from "./pages/payments/OutstandingPaymentsPage";
import PaymentHistoryPage from "./pages/payments/PaymentHistoryPage";
import LoginPage from "./pages/LoginPage";

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});


function App() {

  const [appUser, updateAppUser] = useState();
  const [error, updateError] = useState(null);
    

  return (
    <ThemeProvider theme={darkTheme}>
    <Navbar user={appUser} />
    {/*
      {error && 
        <Error 
           error={error} 
            open={!!error} 
           updateOpen={() => updateError(null)} />}
  */}

    <Routes>
      <Route path="/" element={<LoginPage updateAppUser={updateAppUser}/>} />



      {appUser && 
        <>
          <Route path="/home" element={<HomePage appUser={appUser}/>} />
          <Route path="/refills/quickrefill" element={<CreateRequestsPage appUser={appUser}/>} />
          <Route path="/refills/youropenrefills" element={<OpenUserRequestsPage appUser={appUser}/>} />
          <Route path="/refills/yourapprovedrefills" element={<ApprovedUserRequestsPage appUser={appUser}/>} />
          <Route path="/refills/allrefills" element={<OpenRequestsPage appUser={appUser}/>} />
          <Route path="/refills/admin" element={<ApproveDenyRequestsPage appUser={appUser}/>} />

          <Route path="/payments/outstandingpayments" element={<OutstandingPaymentsPage appUser={appUser}/>} />
          <Route path="/payments/paymenthistory" element={<PaymentHistoryPage appUser={appUser}/>} />

          <Route path="/medicines/addmedicine" element={<CreateMedicinesPage appUser={appUser}/>} />
          <Route path="/medicines/viewallmedicine" element={<OpenMedicinesPage appUser={appUser}/>} />
          <Route path="/medicines/viewyourmedicine" element={<ApprovedUserRequestsPage appUser={appUser}/>} />
          
        </>
      }


      <Route path="/login" element={
        <LoginPage 
          updateError={updateError} 
          updateAppUser={updateAppUser} />
      } />
      
    </Routes>
  </ThemeProvider>
  );
}

export default App;
