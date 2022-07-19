import {Route, Routes, Navigate} from "react-router-dom"
import './App.css';
import Navbar from './components/Navbar'
import HomePage from "./pages/HomePage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import CreateMedicinesPage from "./pages/CreateMedicinesPage";
import OpenMedicinesPage from "./pages/OpenMedicinesPage";
import OpenUserMedicinesPage from "./pages/OpenUserMedicinesPage";

const darkTheme = createTheme({
  palette: {
    mode: 'light'
  },
});


function App() {

  const [appUser, updateAppUser] = useState();
  const [error, updateError] = useState(null);

  return (
    <ThemeProvider theme={darkTheme}>
    <Navbar user={appUser} />

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/createmedicines" element={<CreateMedicinesPage />} />
      <Route path="/medicines" element={<OpenMedicinesPage />} />
      <Route path="/usermedicines" element={<OpenUserMedicinesPage />} />
    </Routes>
  </ThemeProvider>
  );
}

export default App;
