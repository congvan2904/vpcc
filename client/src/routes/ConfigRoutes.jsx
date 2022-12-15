import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Contract1 from "../pages/Contract1";
import Contracts from "../pages/Contracts";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Manager from "../pages/Manager";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Users from "../pages/Users";

const ConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users" element={<Users />} />
      <Route path="/contracts" element={<Contracts />} />
      <Route path="/contract1" element={<Contract1 />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/manager" element={<Manager />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default ConfigRoutes;
