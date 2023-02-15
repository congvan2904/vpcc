import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet";
import "./manager.scss";
import { contracts as contractsR } from "../redux/features/contractsSlice";

const Manager = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    function fetchData() {
      dispatch(contractsR());
      // setDataContract(val.id_contract);
      // const { payload } = result;
      // const { data } = payload;
      // console.log(data);
      // console.log(result);
    }
    fetchData();
  }, []);
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
            <Link to="/users">
              <div className="manager-menu-top-item">User</div>
            </Link>
            <Link to="/dashboard">
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
