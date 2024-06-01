import React, { useState } from "react";
import "./Dashboard.css";
import ChatItem from "../ChatItem/ChatItem";
import Message from "../Message/Message";
import Header from "../Header/Header";

const Dashboard = () => {
  const [selectedID, setselectedID] = useState(null);
 
  return (
    <>
      <div className="dashboard">
        <Header />
        <div className="dashboard__left">
          <div>
            <ChatItem setselectedID={setselectedID} selectedID={selectedID} />
          </div>
        </div>
        <div className="dashboard__right">
          {
            selectedID ? <Message selectedID={selectedID} /> :
            <div className="msg__selectMsgHint_outer">
            <h3 className="msg__selectMsgHint_txt">
              Choose a friend to initiate a chat with.
            </h3>
          </div>              
        }  
          
        </div>
      </div>
    </>
  );
};

export default Dashboard;
