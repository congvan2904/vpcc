import React from "react";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet";
import "./manager.scss";
const Manager = (props) => {
  return (
    <Helmet title="Quản lý">
      <header className="header">Header</header>
      <main className="manager">
        <div className="manager-menu">
          <div className="manager-menu-top">
            <Link to="/manager2">
              <div className="manager-menu-top-item">Manager</div>
            </Link>
            <Link to="/contract1">
              <div className="manager-menu-top-item">Contract</div>
            </Link>
            <Link to="">
              <div className="manager-menu-top-item">User</div>
            </Link>
            <Link to="">
              <div className="manager-menu-top-item">Report</div>
            </Link>
          </div>
          <div className="manager-menu-bottom">
            <Link to="">
              <div className="manager-menu-bottom-item">ICon User</div>
            </Link>
            <Link to="">
              <div className="manager-menu-bottom-item">Đăng xuất</div>
            </Link>
          </div>
        </div>
        <div className="manager-content">{props.children}</div>
      </main>
      <footer className="footer">Footer</footer>
    </Helmet>
  );
};

export default Manager;
