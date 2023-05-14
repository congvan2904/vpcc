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
import { getUserName } from "../redux/features/usersSlice";

// import axios from 'axios'
const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [inputs, setInputs] = useState({});

  const [login, setLogin] = useState(false);
  const refLogo = useRef(null);
  const refUsername = useRef(null);

  const refPassword = useRef(null);

  const [rotation, setRotation] = useState(0);

  const dispatch = useDispatch();
  const handleKeyDownUsername = (event) => {
    // event.preventDefault();
    event.key === "Enter" && refPassword.current.focus();
    if (event.key === "Escape") {
      if (refUsername.current.value) refUsername.current.value = null;
    }
  };
  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const payload = {
        username: refUsername.current.value,
        password: refPassword.current.value,
      };
      const actionResult = await dispatch(loginR(payload));
      // console.log("actionResult", actionResult);
      _style = {
        transform: "rotate(720deg)",
        transition: "transform 3s ease",
      };
      setRotation((state) => state - 720);
      if (actionResult.payload.accessToken) {
        dispatch(getUserName(refUsername.current.value));
        await instance.setLocalToken(
          actionResult.payload.accessToken,
          actionResult.payload.refreshToken
        );
        setTimeout(() => {
          setLogin(true);
        }, 3500);
      }
    }
    if (event.key === "Escape") {
      if (refPassword.current.value) refPassword.current.value = null;
      else refUsername.current.focus();
    }
  };
  let _style = {};
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      username: refUsername.current.value,
      password: refPassword.current.value,
    };
    const actionResult = await dispatch(loginR(payload));
    // console.log("actionResult", actionResult);
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
      {login && <Navigate to="/register" replace={true} />}
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
                ref={refUsername}
                name="username"
                type="text"
                placeholder="Tên đăng nhập"
                className="username-input"
                onKeyDown={handleKeyDownUsername}
                onChange={handleInputChange}
                value={inputs.name}
                autoFocus
                autoComplete="off"
              />
            </div>
            <div className="login-wrap-content-input">
              <img src={pass} alt="password" className="img-login" />
              <input
                ref={refPassword}
                name="password"
                type="password"
                placeholder="Mật khẩu"
                className="password-input"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={inputs.name}
                autoComplete="off"
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
