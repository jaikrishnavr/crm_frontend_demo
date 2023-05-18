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
          <p className="text-center text-muted">
            Take a quick look at your admin status below{" "}
          </p>
          <div className="row text-center">
            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
              <div className="card">
                <div className="card-body">
                  <h5>
                    <i className="bu bi-pencil mx-2"></i>
                    open
                  </h5>
                  <hr />
                  <div className="row">
                    <div className="col">
                      <h1>8</h1>
                    </div>
                    <div className="col">
                      circular bar
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-lg-3 col-md-6 my-1">cards2</div>
            <div className="col-xs-12 col-lg-3 col-md-6 my-1">cards3</div>
            <div className="col-xs-12 col-lg-3 col-md-6 my-1">cards4</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
