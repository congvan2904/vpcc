import React from "react";
import { BrowserRouter } from "react-router-dom";

import ConfigRoutes from "../routes/ConfigRoutes";
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
