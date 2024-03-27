import React from "react";
import "./Dashboard.css";
import ChatItem from "../ChatItem/ChatItem";

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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
