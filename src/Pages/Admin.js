import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import {getAllTickets} from "../api/ticket";
import {getAllUsers} from "../api/user";
import MaterialTable from 'material-table'
import {Modal, Button} from "react-bootstrap";

function Admin(){

    const userName =  localStorage.getItem("name");

    const [ticketDetails,setTicketDetails] = useState([]);
    const [ticketStatusCount, setTicketStatusCount] = useState({});
    const [selectedCurrTicket, setSelectedCurrTicket] = useState({});
    const [ticketUpdateModal, setTicketUpdateModal] = useState(false);

    const [userDetails,setUserDetails]=useState([]);

    useEffect(()=>{
        fetchTickets();
        fetchUsers();
    },[])
    const fetchTickets=()=>{
        getAllTickets()
        .then(res=>{
           setTicketDetails(res.data);
           updateTicketsCount(res.data);
           console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
        const fetchUsers=()=>{
        getAllUsers()
        .then(res=>{
           setUserDetails(res.data);
           console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    const updateTicketsCount=(tickets)=>{
        const data={
            pending:0,
            closed:0,
            progress:0,
            blocked:0
        }
        tickets.forEach(ticket => {
            if(ticket.status==="OPEN")
                data.pending+=1;
            else if(ticket.status==="INPROGRESS")
                data.progress+=1;
            else if(ticket.status==="BLOCKED")
                data.blocked+=1;
            else
                data.closed+=1; 
        });
        setTicketStatusCount({...data});
    }


    const editTicket =(ticketDetail)=>{
        console.log(ticketDetail);
        setTicketUpdateModal(true);
        setSelectedCurrTicket(ticketDetail);
    }

    const closeTicketUpdateModal =  ()=>{
        setTicketUpdateModal(false);
    }


    return (
        <div className="row bg-light" >

            <div className="col-1">
            <Sidebar/>
            </div>
            <div className="col my-4">
                <div className="container">
                    <div>
                        <h3 className="text-primary text-center" > Welcome, {userName} </h3>
                        <p className="text-center text-muted" > Take a quick look at your admin stats below </p>
                        <div className="row text-center">
                            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card cardItem shadow  bg-primary text-dark bg-opacity-25 border border-primary">
                                    <div className="card-body">
                                        <h5 className="mb-2" >
                                            <i className="text-primary bi bi-pencil mx-2"></i>
                                            Open
                                        </h5>
                                        <hr/>
                                        <div className="row">
                                            <div className="col">
                                                <h1 className="text-dark mx-4"> {ticketStatusCount.pending} </h1>
                                            </div>
                                            <div className="col">
                                                <div style={{width:60, height:60}}>
                                                <CircularProgressbar value={ticketStatusCount.pending} styles={buildStyles({ textColor:"red", pathColor:"darkBlue"})} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                              <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card cardItem shadow  bg-warning text-dark bg-opacity-25 border border-warning">
                                    <div className="card-body">
                                        <h5 className="mb-2" >
                                            <i className="text-warning bi bi-lightning-charge mx-2"></i>
                                            Progress
                                        </h5>
                                        <hr/>
                                        <div className="row">
                                            <div className="col">
                                                <h1 className="text-dark mx-4"> {ticketStatusCount.progress} </h1>
                                            </div>
                                            <div className="col">
                                                <div style={{width:60, height:60}}>
                                                <CircularProgressbar value={ticketStatusCount.progress} styles={buildStyles({ textColor:"red", pathColor:"#AA6C39"})} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card cardItem shadow  bg-success text-dark bg-opacity-25 border border-success">
                                    <div className="card-body">
                                        <h5 className="mb-2" >
                                            <i className="text-success bi bi-check-circle mx-2"></i>
                                            Closed
                                        </h5>
                                        <hr/>
                                        <div className="row">
                                            <div className="col">
                                                <h1 className="text-dark mx-4"> {ticketStatusCount.closed} </h1>
                                            </div>
                                            <div className="col">
                                                <div style={{width:60, height:60}}>
                                                <CircularProgressbar value={ticketStatusCount.closed} styles={buildStyles({ textColor:"red", pathColor:"green"})} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card cardItem shadow  bg-secondary text-dark bg-opacity-25 border border-secondary">
                                    <div className="card-body">
                                        <h5 className="mb-2" >
                                            <i className="text-dark bi bi-slash-circle mx-2"></i>
                                            Blocked
                                        </h5>
                                        <hr/>
                                        <div className="row">
                                            <div className="col">
                                                <h1 className="text-dark mx-4"> {ticketStatusCount.blocked} </h1>
                                            </div>
                                            <div className="col">
                                                <div style={{width:60, height:60}}>
                                                <CircularProgressbar value={ticketStatusCount.blocked} styles={buildStyles({ textColor:"red", pathColor:"black"})} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            <br/>            
            <div style={{  maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'USER ID', field: 'userId' },
            { title: 'NAME', field: 'name' },
            { title: 'EMAIL', field: 'email' },
            { title: 'ROLE', field: 'userTypes' },
            { title: 'STATUS', field: 'userStatus' },
          ]}
          data={userDetails}
          title="USER RECORDS"
          options={{

            sorting:true,
            rowStyle:{
                cursor:"pointer"
            }
          }}      
        />




      </div>

      <hr/>

             <div style={{ maxWidth: '100%' }}>
        <MaterialTable

        onRowClick={ (event,rowData)=> editTicket(rowData) }

          columns={[
            { title: 'TICKET ID', field: '_id' },
            { title: 'TITLE', field: 'title' },
            { title: 'DESCRIPTION', field: 'description' },
            { title: 'REQUESTOR', field: 'requestor' },
            { title: 'PRIORITY', field: 'ticketPriority' },
            { title: 'ASSIGNEE', field: 'assignee' },
            { title: 'STATUS', field: 'status' },
          ]}
          data={ticketDetails}
          title="TICKET RECORDS"
          options={{
            sorting:true,
            rowStyle:{
                cursor:"pointer"
            }
          }}      
        />

       <Modal show={ticketUpdateModal} onHide={closeTicketUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>

            <form>

                <div className="p-1">
                    <h5> TicketId : {selectedCurrTicket._id} </h5>
                </div>

            </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeTicketUpdateModal}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{}}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Admin;