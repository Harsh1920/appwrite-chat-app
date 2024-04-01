import React, { useEffect, useRef } from "react";
import "./Login.css";
import { ID, account } from "../../lib/appwrite";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log("Email ID:", email, "Password:", password);
    // Login user
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={submitHandler} className="form">
        <input type="email" placeholder="Email ID " ref={emailRef} required />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
