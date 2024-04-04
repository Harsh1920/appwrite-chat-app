import React, { useEffect, useRef } from "react";
import "./Login.css";
import { useNavigate } from "react-router";
import { account } from "../../lib/appwrite";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log("Email ID:", email, "Password:", password);
    try {
      await account.createEmailSession(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div className="form__outer">
      <h1>Login</h1>
      <form onSubmit={submitHandler} className="form">
        <input type="email" placeholder="Email ID " ref={emailRef} required />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        <button className="btn" type="submit">
          Login
        </button>
        <div>
          <p>Not hava an account? Register.</p>
        </div>
      </form>
    </div>
  );
};
export default Login;
