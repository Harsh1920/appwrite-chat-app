import React from "react";
import "./Dashboard.css";
import ChatItem from "../ChatItem/ChatItem";
import Message from "../Message/Message";
import Header from "../Header/Header";

const Dashboard = () => {
  return (
    <>
      
      <div className="dashboard">
      <Header />
        <div className="dashboard__left">
          <div>
            <ChatItem />
          </div>
        </div>
        <div className="dashboard__right">
          
          {/* <div className="msg__selectMsgHint_outer">
            <h3 className="msg__selectMsgHint_txt">Choose a friend to initiate a chat with.</h3>
          </div> */}
          
          <Message/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
