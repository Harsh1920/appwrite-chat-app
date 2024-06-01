import React, { useEffect, useRef } from "react";
import "./Login.css";
import { ID, account } from "../../lib/appwrite";
import { Navigate, useNavigate } from "react-router";

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
      await account.createEmailPasswordSession(email, password);
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
        <div className="form__already_regi_login_outer">
          <div className="form__already_regi_login_inner">
            <p>Not have an account?</p>
            <p
              className="form__highlight"
              onClick={() => {
                navigate("/");
              }}
            >
              Register
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
