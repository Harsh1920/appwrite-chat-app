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
          <div>Right</div>
          <Message  uid="mine"/>
          <Message  uid="friend"/>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
