import React, { useRef, useEffect } from "react";
import "./Register.css";
import { ID, account, databases } from "../../lib/appwrite";
import { useNavigate } from "react-router-dom";

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
      await insertUserDB(eml, name);
      userLoginSession(eml, psw);
    } catch (error) {
      throw new Error(error);
    }
  };

  async function userLoginSession(email, password) {
    await account.createEmailSession(email, password);
    console.log(await account.get());
    navigate("/dashboard", { replace: true });
  }

  const insertUserDB = async (email, name) => {
    try {
      const result = await databases.createDocument(
        "660c34d27dde81eeac4c",
        "660c350aec53973fc11d",
        ID.unique(),
        { user_name: name, user_email: email }
      );
      console.log(result);
    } catch (error) {
      console.error("Error inserting user into DB", error);
    }
  };

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  return (
    <div className="login">
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
