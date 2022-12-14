import React from "react";
import Helmet from "../components/Helmet";
import "./manager.scss";
const Manager = () => {
  return (
    <Helmet title="Quản lý">
      <header className="header">Header</header>
      <main className="manager">
        <div className="manager-menu">Left Bar</div>
        <div className="manager-content">Content</div>
      </main>
      <footer className="footer">Footer</footer>
    </Helmet>
  );
};

export default Manager;
