import React from "react";
import { Route, Routes } from "react-router-dom";
import BodyRightNewContractOld from "../components/body/BodyRightNewContractOld";
import BodyRightNewContractSearch from "../components/body/BodyRightNewContractSearch";
import BodyRightNewContractToday from "../components/body/BodyRightNewContractToday";
import About from "../pages/About";
import Contract1 from "../pages/Contract1";
import Contracts from "../pages/Contracts";
import Dashboard from "../pages/Dashboard";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Manager from "../pages/Manager";
import Manager1 from "../pages/Manager1";
import Manager2 from "../pages/Manager2";
import Manager3 from "../pages/Manager3";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Users from "../pages/Users";

const ConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users" element={<Users />} />
      <Route path="/contracts" element={<Contracts />} />
      <Route path="/contract1" element={<Contract1 />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/manager" element={<Manager />} />
      <Route path="/manager1" element={<Manager1 />} />
      <Route path="/manager2" element={<Manager2 />} />
      <Route path="/manager3" element={<Manager3 />} />
      <Route
        path="/new-contract-today"
        element={<BodyRightNewContractToday />}
      />
      <Route path="/new-contract-old" element={<BodyRightNewContractOld />} />
      <Route
        path="/new-contract-search"
        element={<BodyRightNewContractSearch />}
      />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default ConfigRoutes;
