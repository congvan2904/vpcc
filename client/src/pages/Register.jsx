import React from "react";
import "./landing.scss";
import logo from "../assets/logo.png";
const Register = () => {
  return (
    <div className="landing">
      <div className="header">
        <div className="header-logo">
          <div className="header-logo-image">
            <img src={logo} alt="Logo vpcc Nguyễn Đức Điền" />
          </div>
          <div className="header-logo-text">
            <p>Văn phòng công chứng</p>
            <p>Nguyễn Đức Điền</p>
          </div>
        </div>
        <div className="header-menu">
          <div className="header-menu-item">
            <button>Đăng Nhập</button>
          </div>
        </div>
        <div className="triangle-dow">
          <p>V</p>
        </div>
      </div>
      <div className="sub-header"></div>
      <div className="triangle-dow"></div>
    </div>
  );
};

export default Register;
