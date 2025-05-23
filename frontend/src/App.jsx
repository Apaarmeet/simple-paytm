import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Send from "./pages/Send";
function App() {

  return (
  <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/signin" element={<Signin />}/>
        <Route path = "/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
    </Routes>
  </BrowserRouter>
  </div>
  )
}

export default App
