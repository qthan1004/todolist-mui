import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

function Auth({ authRoute }) {
  console.log(authRoute);
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);
  let body;

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  } else {
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );
  }

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Todo List</h1>
          {body}
        </div>
      </div>
    </div>
  );
}

export default Auth;
