import {Route, Routes, Navigate} from "react-router-dom"
import './App.css';
import Navbar from './components/Navbar'
import HomePage from "./pages/HomePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import CreateRequestsPage from "./pages/CreateRequestsPage";
import OpenRequestsPage from "./pages/OpenRequestsPage";
import ApprovedUserRequestsPage from "./pages/ApprovedUserRequestsPage";
import OpenUserRequestsPage from "./pages/OpenUserRequestsPage";
import ApproveDenyRequestsPage from "./pages/ApproveDenyRequestsPage";

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
      <Route path="/" element={<HomePage />} />
      <Route path="/createrequest" element={<CreateRequestsPage />} />
      <Route path="/openrequests" element={<OpenRequestsPage />} />
      <Route path="/openuserrequests" element={<OpenUserRequestsPage />} />
      <Route path="/approveduserrequests" element={<ApprovedUserRequestsPage />} />
      <Route path="/approvedenyrequests" element={<ApproveDenyRequestsPage />} />
      {/*
      {appUser && 
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/requests" element={<RequestsPage />} />
        </>
      }
    */}
      {/*
      <Route path="/login" element={
        <LoginPage 
          updateError={updateError} 
          updateAppUser={updateAppUser} />
      } />
      */}
    </Routes>
  </ThemeProvider>
  );
}

export default App;
