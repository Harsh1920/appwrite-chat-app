import React from "react";
import "./Dashboard.css";
import ChatItem from "../ChatItem/ChatItem";
import Message from "../Message/Message";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <div className="dashboard__left">
          <div>
            <ChatItem />
          </div>
        </div>
        <div className="dashboard__right">
          <div className="msg__outer">
            
            <p>Hi</p>
          </div>
          {/* <Message/> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
