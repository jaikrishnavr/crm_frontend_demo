import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { userSignIn, userSignUp } from "../api/auth";

// This function defines the Login component.
function Login() {
  // This state variable stores whether the user is signing up or logging in.
  const [ShowSignup, setShowSignup] = useState(false);
  // This state variable stores the user ID.
  const [userId, setUserId] = useState("");
  // This state variable stores the password.
  const [password, setPassword] = useState("");
  // This state variable stores the user name.
  const [userName, setUserName] = useState("");
  // This state variable stores the user email.
  const [userEmail, setUserEmail] = useState("");
  // This state variable stores the user type.
  const [userType, setUserType] = useState("CUSTOMER");
  // This state variable stores the message to display to the user.
  const [message, setMessage] = useState("");
  // This state variable stores whether an error has occurred.
  const [error, setError] = useState(false);
  // This function toggles between the sign up and log in forms.

  const toggleSignup = () => {
    setShowSignup(!ShowSignup);
    clearState();
  };

  // This function clears the form fields.
  const clearState = () => {
    setUserId("");
    setPassword("");
    setUserName("");
    setUserEmail("");
    setMessage("");
  };

  // This function signs up the user.
  const onSignUp = (e) => {
    e.preventDefault();

    // Validate the user input.
    if (userId.length < 5) {
      setError(true);
      setMessage("UserId should be of 5 to 10 characters");
      return;
    } else if (password.length < 5 || password.length > 12) {
      setError(true);
      setMessage("Password should of 5 to 12 characters");
      return;
    }

    // Make an API call to sign up the user.
    userSignUp({
      name: userName,
      userId: userId,
      email: userEmail,
      userType: userType,
      password: password,
    })
      .then((res) => {
        console.log(res);
        setError(false);
        setMessage("SignUp successful");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setError(true);
          setMessage(err.response.data.message);
        } else {
          setError(true);
          setMessage("Something went wrong. Please try again later.");
        }
      });
  };

  // This function logs in the user.
  const onLogin = (e) => {
    e.preventDefault();

    // Make an API call to log in the user.
    userSignIn({
      userId,
      password,
    })
      .then((res) => {
        console.log(res);
        setError(false);
        setMessage("Login Successful");
      })
      .catch((err) => {
        if (err.response.status) {
          setError(true);
          setMessage(err.response.data.message);
        }
      });
  };

  // This function updates the form data when a field is changed.
  const updateSignData = (e) => {
    const id = e.target.id;

    if (id === "userId") {
      setUserId(e.target.value);
    } else if (id === "password") {
      setPassword(e.target.value);
    } else if (id === "email") {
      setUserEmail(e.target.value);
    } else {
      setUserName(e.target.value);
    }
  };

  // This function returns the Login component.
  return (
    <div className="bg-secondary d-flex justify-content-center align-items-center vh-100">
      <div
        style={{ width: 30 + "rem" }}
        className="card p-3 rounded-5 shadow-lg"
      >
        <h4 className="text-dark">{ShowSignup ? "Signup" : "Login"}</h4>

        <form onSubmit={ShowSignup ? onSignUp : onLogin}>
          <div className="input-group">
            <input
              className="form-control m-1"
              type="text"
              value={userId}
              id="userId"
              onChange={updateSignData}
              placeholder="UserId"
            />
          </div>

          {/* enables when ShowSignup is true*/}
          {ShowSignup && (
            <>
              <div className="input-group">
                <input
                  className="form-control m-1"
                  type="text"
                  value={userName}
                  id="userName"
                  onChange={updateSignData}
                  placeholder="Username"
                />
              </div>
              <div className="input-group">
                <input
                  className="form-control m-1"
                  value={userEmail}
                  id="email"
                  onChange={updateSignData}
                  type="email"
                  placeholder="email"
                />
              </div>
            </>
          )}

          <div className="input-group">
            <input
              className="form-control m-1"
              value={password}
              id="password"
              onChange={updateSignData}
              type="password"
              placeholder="Password"
            />
          </div>

          {/* this enables when ShowSignup is true*/}

          {ShowSignup && (
            <DropdownButton
              title={userType}
              id="userType"
              variant="light"
              align="end"
            >
              <Dropdown.Item eventKey="CUSTOMER"> CUSTOMER </Dropdown.Item>
              <Dropdown.Item eventKey="ENGINEER"> ENGINEER </Dropdown.Item>
            </DropdownButton>
          )}

          {/* enables when ShowSignup is true*/}

          <div className="input-group">
            <input
              className="btn btn-danger form-control text-white m-1 cursor-pointer"
              type="submit"
              value={ShowSignup ? "Sign Up" : "Log In"}
            />
          </div>

          <div className="text-dark m-1" onClick={toggleSignup}>
            {ShowSignup
              ? "Already have an account ? LogIn"
              : "Don't have an account ? Sign Up"}
          </div>

          <div className={error ? "text-danger" : "text-success"}>
            {message}
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default Login;
