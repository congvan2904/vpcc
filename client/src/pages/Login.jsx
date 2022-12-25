import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profile from "../assets/login/a.png";
import email from "./../assets/login/email.jpg";
import pass from "./../assets/login/pass.png";
import logo from "../assets/logo.png";
import "./login.scss";
import Helmet from "../components/Helmet";
import instance from "../services/configAxios";
import { login as loginR } from "../redux/features/authSlice";

// import axios from 'axios'
const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [login, setLogin] = useState(false);
  const refLogo = useRef(null);
  const [rotation, setRotation] = useState(0);

  const dispatch = useDispatch();
  const { refreshToken } = useSelector((state) => state.auth.data);

  // console.log("kq", refreshToken);
  let _style = {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = (await instance.post("user/login", { username, password }))
    //   .data;
    const actionResult = await dispatch(loginR({ username, password }));
    console.log("actionResult", actionResult);
    _style = {
      transform: "rotate(720deg)",
      transition: "transform 3s ease",
    };
    setRotation((state) => state - 720);
    if (actionResult.payload.accessToken) {
      await instance.setLocalToken(
        actionResult.payload.accessToken,
        actionResult.payload.refreshToken
      );
      setTimeout(() => {
        setLogin(true);
      }, 3500);
    }
  };
  // if (accessToken && refreshToken)
  //   return <Navigate to="/dashboard" replace={true} />;
  return (
    <Helmet title={"Đăng nhập"}>
      {login && <Navigate to="/dashboard" replace={true} />}
      <div className="login">
        <div className="login-wrap">
          <div className="login-wrap-logo">
            <img
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: "transform 3s ease",
              }}
              src={logo}
              alt="logo VPCC Nguyễn Đức Điền"
              className="logo"
              ref={refLogo}
            />
          </div>
          <div className="login-wrap-content">
            <h1 className="login-wrap-content-title">Trang Đăng Nhập</h1>
            <div className="login-wrap-content-input">
              <img src={email} alt="user name" className="img-login" />
              <input
                type="text"
                placeholder="Tên đăng nhập"
                className="username-input"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login-wrap-content-input">
              <img src={pass} alt="password" className="img-login" />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="password-input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-wrap-content-button">
              <button onClick={handleSubmit}>Đăng nhập</button>
            </div>

            <p className="login-wrap-content-link">
              <Link to="#">Quên mật khẩu ?</Link>
              <Link to="/register">Đăng ký</Link>
            </p>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Login;
