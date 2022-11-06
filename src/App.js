import { useState } from "react";
import Form from "./Form";
import "./style.css";
import { useEffect } from "react";
import { initFirebaseAuth } from "./firebase";
import Screen from "./Screen";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Login from "./Component/Screen";

function App() {
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
  </Routes>;
}

export default App;
