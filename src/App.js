import {Route, Routes} from "react-router-dom"
import './App.css';
import Navbar from './components/Navbar'
import HomePage from "./pages/HomePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import CreateMedicinesPage from "./pages/medicine/CreateMedicinesPage";
import OpenMedicinesPage from "./pages/medicine/OpenMedicinesPage";
import CreateRequestsPage from "./pages/requests/CreateRequestsPage";
import OpenRequestsPage from "./pages/requests/OpenRequestsPage";
import ApprovedUserRequestsPage from "./pages/requests/ApprovedUserRequestsPage";
import OpenUserRequestsPage from "./pages/requests/OpenUserRequestsPage";
import ApproveDenyRequestsPage from "./pages/requests/ApproveDenyRequestsPage";
import OutstandingPaymentsPage from "./pages/payments/OutstandingPaymentsPage";
import PaymentHistoryPage from "./pages/payments/PaymentHistoryPage";
import AllPaymentsPage from "./pages/payments/AllPaymentsPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
});


function App() {

  const [appUser, updateAppUser] = useState(null);
  const [error, updateError] = useState(null);

  return (
    <ThemeProvider theme={darkTheme}>
    <Navbar user={appUser} />

    <Routes>
      <Route path="/" element={<LoginPage updateAppUser={updateAppUser}/>} />



      {appUser && 
        <>
          <Route path="/home" element={<HomePage appUser={appUser}/>} />
          <Route path="/refills/quickrefill" element={<CreateRequestsPage appUser={appUser}/>} />
          <Route path="/refills/youropenrefills" element={<OpenUserRequestsPage appUser={appUser}/>} />
          <Route path="/refills/yourapprovedrefills" element={<ApprovedUserRequestsPage appUser={appUser}/>} />
          <Route path="/admin/allrefills" element={<OpenRequestsPage appUser={appUser}/>} />
          <Route path="/admin/pendingrefills" element={<ApproveDenyRequestsPage appUser={appUser}/>} />

          <Route path="/payments/youroutstandingpayments" element={<OutstandingPaymentsPage appUser={appUser}/>} />
          <Route path="/payments/yourpaymenthistory" element={<PaymentHistoryPage appUser={appUser}/>} />
          <Route path="/admin/allpayments" element={<AllPaymentsPage appUser={appUser}/>} />

          <Route path="/admin/addmedication" element={<CreateMedicinesPage appUser={appUser}/>} />
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
    <Footer/>
  </ThemeProvider>
  );
}

export default App;
