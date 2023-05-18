import React from "react";
import Sidebar from "../Components/Sidebar";

function Admin() {

  const userName = localStorage.getItem("name");
  return (
    <div className="row bg-light">
      <div className="col-1">
        <Sidebar />
      </div>

      <div className="col vh-100 m-4">
        <div className="container">
        <h3 className="text-primary text-center">Welcome, {userName} </h3>
        <p className="text-center text-muted">Take a quick look at your admin status below </p>
      </div>
      </div>
    </div>
  );
}

export default Admin;
