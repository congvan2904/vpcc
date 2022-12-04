import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "../pages/About";
import Contracts from "../pages/Contracts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Users from "../pages/Users";
import ConfigRoutes from "../routes/ConfigRoutes";
import Footer from "./Footer";
import Header from "./Header";
import "../sass/_index.scss";
// import configRoutes from '../routes/ConfigRoutes'

const Layout = () => {
  return (
    <BrowserRouter>
      <ConfigRoutes />
    </BrowserRouter>
  );
};

export default Layout;
