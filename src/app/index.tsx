import React from "react";
import Tour from "./features/tour";
// import Home from "./features/home/Home";
import Registration from "./features/registration/Registration";
import Login from "./features/login/Login";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppTheme from "../utils/AppTheme";
import Chat from "./features/chat/Chat";
import Home1 from "./features/home1";

const AppContent = () => {
  return (
    <>
      {/* {shouldShowHeader && <AppHeader />} */}
      <Routes>
        <Route path="/" element={<Home1 />} />
        <Route path="/:id" element={<Tour />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
};

const Vastralaya = () => {
  return (
    <div>
      <ThemeProvider theme={AppTheme}>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default Vastralaya;
