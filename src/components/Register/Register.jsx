import React, { useRef, useEffect } from "react";
import "./Register.css";
import { ID, account, databases } from "../../lib/appwrite";
import { useNavigate } from "react-router-dom";
import { COLLECTION_USER_LIST_ID, DATABSE_ID } from "../../utils/constant";

const Register = () => {
  let navigate = useNavigate();

  const isUser = account.get().then((data) => {
    if (data) {
      navigate("/dashboard", { replace: true });
    }
  });

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log("Email ID:", email, "Password:", password, "Name:", name);
    // Register user
    createUser(email, password, name);
  };

  const createUser = async (eml, psw, name) => {
    try {
      await account.create(ID.unique(), eml, psw, name);
      userLoginSession(eml,psw,name)
      
    } catch (error) {
      alert(error)
      throw new Error(error);
    }
  };

  async function userLoginSession(email, password,name) {
    await account.createEmailSession(email, password);
    console.log(await account.get());
    const userData = await account.get();
    console.log("userData: ",userData);
    insertUserDB(email,userData,name)
    
  }

  const insertUserDB = async (email, userData,name) => {
    try {
      const result = await databases.createDocument(
        DATABSE_ID,
        COLLECTION_USER_LIST_ID,
        ID.unique(),
        { user_name: name, user_email: email,uid:userData?.$id }
      );
      console.log(result);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Error inserting user into DB", error);
    }
  };

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  return (
    <div className="form__outer">
      <h1>Register</h1>
      <form onSubmit={submitHandler} className="form">
        <input type="text" placeholder="Name" ref={nameRef} required />
        <input type="email" placeholder="Email ID" ref={emailRef} required />
        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
        />
        <button className="btn" type="submit">
          Register
        </button>
        <div className="form__already_regi_login_outer">
          <div className="form__already_regi_login_inner">
            <p>Alread have an account?</p>
            <p
              className="form__highlight"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
