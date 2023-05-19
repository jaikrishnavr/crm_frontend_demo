import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import {getAllTickets } from "../api/ticket";

function Admin() {
  const userName = localStorage.getItem("name");

  const [ticketDetails, setTicketDetails] = useState([]);

  useEffect(()=>{
    fetchTickets();
  },[])

  const fetchTickets = () => {

    getAllTickets()
    .then(res => {
      setTicketDetails(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }
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
              <div className="card cardItems shadow bg-primary text-dark bg-opacity-25 border border-primary">
                <div className="card-body">
                  <h5 className="mb-2">
                    <i className="text-primary bi bi-pencil mx-2"></i>
                    Open
                  </h5>
                  <hr />
                  <div className="row">
                    <div className="col">
                      <h1 className="text-dark mx-4">8</h1>
                    </div>
                    <div className="col">
                      <div style={{ width:60, height:60}}> 
                      <CircularProgressbar value={80} styles= {buildStyles ({textColor:"red", pathColor : "darkBlue" }) } />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
              <div className="card cardItems shadow bg-warning text-dark bg-opacity-25 border border-warning">
                <div className="card-body">
                  <h5 className="mb-2">
                    <i className="text-warning bi bi-lightning mx-2"></i>
                    Progress
                  </h5>
                  <hr />
                  <div className="row">
                    <div className="col">
                      <h1 className="text-dark mx-4">4</h1>
                    </div>
                    <div className="col">
                      <div style={{ width:60, height:60}}> 
                      <CircularProgressbar value={40} styles= {buildStyles ({textColor:"red", pathColor : "#AA6C39" }) } />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
              <div className="card cardItems shadow bg-success text-dark bg-opacity-25 border border-success">
                <div className="card-body">
                  <h5 className="mb-2">
                    <i className="text-success bi bi-check-circle mx-2"></i>
                    Closed
                  </h5>
                  <hr />
                  <div className="row">
                    <div className="col">
                      <h1 className="text-dark mx-4">7</h1>
                    </div>
                    <div className="col">
                      <div style={{ width:60, height:60}}> 
                      <CircularProgressbar value={70} styles= {buildStyles ({textColor:"red", pathColor : "green" }) } />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
              <div className="card cardItems shadow bg-secondary text-dark bg-opacity-25 border border-secondary">
                <div className="card-body">
                  <h5 className="mb-2">
                    <i className="text-dark bi bi-slash-circle mx-2"></i>
                   Blocked
                  </h5>
                  <hr />
                  <div className="row">
                    <div className="col">
                      <h1 className="text-dark mx-4">5</h1>
                    </div>
                    <div className="col">
                      <div style={{ width:60, height:60}}> 
                      <CircularProgressbar value={50} styles= {buildStyles ({textColor:"red", pathColor : "black" }) } />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
