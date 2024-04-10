import React, { useRef } from "react";
import "./Message.css";
import { ID, account, databases } from "../../lib/appwrite";

function Message({ uid }) {
  const msgRef = useRef(null);
  
  const onSend = async () => {
    // send data to collection
    const msg = msgRef.current.value;
    console.log("msg: ", msg);
    // databases.

    try {
      const result = await databases.createDocument(
        "660c34d27dde81eeac4c",
        "660ed72fd87cd8131f51",
        ID.unique(),
        { message: msg, sender: "", receiver: "" }
      );
      console.log(result);
      msgRef.current.value = null;
    } catch (error) {
      console.error("Error inserting data into DB", error);
    }
  };

  console.log("uid: ", uid);
  return (
    <div className="chat-frame">
      <div className="msg-display-area">        
        <div className="chat-bubble">We are learning CSS right now!</div>      
        <div className="chat-bubble">
          Laxy is React Native Developer. Laxy is earning nice amount of money.
          So he wants donate all his wealth to Harsh. And Laxy is planning two
          child as well with second wife.
        </div>
        <div className="chat-bubble">Harsh is learning programming.</div>        
      </div>
      
      <div className="msg-send-area">
        <input
          ref={msgRef}
          type="text"
          placeholder="Enter Message..."
          autoFocus
        />
        <button onClick={onSend} type="button">
          Send
        </button>
      </div>
    </div>
  );
}

export default Message;
