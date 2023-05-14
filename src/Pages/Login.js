import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Login() {

    const [ShowSignup, SetShowsignup] = useState(false);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const [userType, setUserType] = useState("CUSTOMER");

{/* It enables when ShowSignup is true*/}
    const toggleSignup = () => {
        SetShowsignup(!ShowSignup);
    }
    

    return <div className="bg-secondary d-flex justify-content-center align-items-center vh-100" >
        <div style={{ width: 30 + "rem" }} className='card p-3 rounded-5 shadow-lg'>

            <h4 className="text-dark">{ShowSignup ? 'Signup' : 'Login'}</h4>

            <form>
                <div className="input-group">
                    <input className="form-control m-1" type="text" value={name} placeholder="Name" />
                </div>


                {/* enables when ShowSignup is true*/}
                {
                    ShowSignup &&
                    <>
                        <div className='input-group'>
                            <input className='form-control m-1' type='text' value={userName} placeholder='username' />

                        </div>
                        <div className='input-group'>
                            <input className='form-control m-1' type='email' value={userEmail} placeholder='email' />

                        </div>
                    </>
                }
                <div className="input-group">
                    <input className="form-control m-1" value={password} type="password" placeholder="Password" />
                </div>


                {/* this enables when ShowSignup is true*/}

                {
                    ShowSignup &&
                    <DropdownButton
                        title={userType}
                        id="userType"
                        variant="light"
                        align="end"
                    >

                        <Dropdown.Item eventKey="CUSTOMER" > CUSTOMER </Dropdown.Item>
                        <Dropdown.Item eventKey="ENGINEER" > ENGINEER </Dropdown.Item>

                    </DropdownButton>

                }


                {/* enables when ShowSignup is true*/}

                <div className="input-group">
                    <input className="btn btn-danger form-control text-white m-1 cursor-pointer" type="submit"
                        value={ShowSignup ? "Sign Up" : "Log In"} />
                </div>


                <div className="text-dark m-1" onClick={toggleSignup} >
                    {
                        ShowSignup ? "Already have an account ? LogIn"
                            : "Don't have an account ? Sign Up"
                    }
                </div>

            </form>


        </div>


    </div>
}

export default Login