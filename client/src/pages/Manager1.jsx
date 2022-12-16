import React from "react";
import { Link } from "react-router-dom";
import Manager from "./Manager";
import "./manager1.scss";
const Manager1 = (props) => {
  return (
    <Manager>
      <div className="manager-header">
        <Link to="/manager2">
          <div className="manager-header-today">Hồ sơ mới</div>
        </Link>
        <Link to="/manager3">
          <div className="manager-header-oldday">Hồ sơ cũ</div>
        </Link>
      </div>
      <div className="manager-content">{props.children}</div>
    </Manager>
  );
};

export default Manager1;
