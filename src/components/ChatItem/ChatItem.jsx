import React from "react";
import icon from "../../assets/react.svg";
import "./ChatItem.css";

const ChatItem = () => {
  return (
    <>
      <div className="chat-card">
        <img src={icon} alt="Person Avtar" />
        <h5>Harsh Prajapati</h5>
      </div>
    </>
  );
};

export default ChatItem;
