import React, { useEffect, useState } from "react";
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

  // Check user type and token stored in localStorage
  // Redirect user based on userType: ENGINEER, CUSTOMER, or ADMIN
  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const token = localStorage.getItem("token");

    if (!token || !userType) {
      return;
    }

    if (userType === "ENGINEER") {
      window.location.href = "/engineer";
    } else if (userType === "CUSTOMER") {
      window.location.href = "/customer";
    } else {
      window.location.href = "/admin";
    }
  }, []);

  // Toggle signup form visibility and clear state
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
    setError(false);
    setMessage("");
  };

  // This function signs up the user.
  const onSignUp = (e) => {
    const data = {
      name: userName,
      userId: userId,
      email: userEmail,
      userType: userType,
      password: password,
    };

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

    userSignUp(data)
      .then((res) => {
        console.log(res);
        setError(false);
        setMessage("SignUp successful");
        window.location.href = "/";
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
    const data = { userId, password };
    e.preventDefault();

    // Make an API call to log in the user.

    userSignIn(data)
      .then((res) => {
        console.log(res);
        setError(false);
        setMessage("Login Successful");

        // Store user data in localStorage for future use
        localStorage.setItem("name", res.data.name); // Store user's name
        localStorage.setItem("userId", res.data.userId); // Store user's ID
        localStorage.setItem("email", res.data.email); // Store user's email
        localStorage.setItem("userStatus", res.data.userStatus); // Store user's status
        localStorage.setItem("token", res.data.accessToken); // Store access token
        localStorage.setItem("userType", res.data.userType); // Store user's type

        if (res.data.userType === "ENGINEER") {
          window.location.href = "/engineer";
        } else if (res.data.userType === "CUSTOMER") {
          window.location.href = "/customer";
        } else {
          window.location.href = "/admin";
        }
      })

      .catch((err) => {
        if (err.response.status) {
          setError(true);
          setMessage(err.response.data.message);
        } else {
          setError(true);
          setMessage("Something went wrong. Please try again later.");
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

  const handleSelect = (e) => {
    setUserType(e);
  };

  // This function returns the Login component.
  return (
    <div className="bg-secondary d-flex justify-content-center align-items-center vh-100">
      <div
        style={{ width: 30 + "rem" }}
        className="card p-3 rounded-5 shadow-lg"
      >
        <h4 className={ShowSignup ? "text-secondary" : "text-danger" }>{ShowSignup ? "Signup" : "Login"}</h4>

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
              onSelect={handleSelect}
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
              className={ShowSignup ? "bg-dark form-control text-white m-1 cursor-pointer" : "bg-danger form-control text-white m-1 cursor-pointer " }
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
