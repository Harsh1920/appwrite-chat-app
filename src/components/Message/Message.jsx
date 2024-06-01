import React, { useEffect, useRef, useState } from "react";
import "./Message.css";
import { ID, account, databases } from "../../lib/appwrite";
import { AiOutlineSend} from "react-icons/ai";
import { Query } from "appwrite";
import { COLLECTION_CHAT_ID, DATABSE_ID } from "../../utils/constant";



function Message({  selectedID }) {
  const [chat, setChat] = useState([]);

  const msgRef = useRef(null);

  const fetchChat =async () => {
    const myInfo = await account.get();
    console.log("myInfo: ",myInfo);
    let promise = databases.listDocuments(DATABSE_ID, COLLECTION_CHAT_ID, [
      
      Query.contains("users",myInfo?.$id)
    ]);

    promise.then(
      function (response) {
        console.log("Chat List:", response);
        const chatList = response.documents;
        setChat(chatList);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    fetchChat();
  }, [selectedID]);

  const onSend = async () => {
    // send data to collection
    const msg = msgRef.current.value;
    console.log("msg: ", msg);
    const myInfo = await account.get();
    console.log("id1: ",myInfo?.$id + "_" + selectedID);
    console.log("id2: ",selectedID+"_"+myInfo?.$id);
    try {
      const result = await databases.createDocument(
        DATABSE_ID,
        COLLECTION_CHAT_ID,
        ID.unique(),
        {
          message: msg, sender: myInfo.$id, receiver: selectedID, users: [myInfo.$id, selectedID], id1: myInfo?.$id + "_" + selectedID,
      
          id2:selectedID+"_"+myInfo?.$id
        }
      );
      console.log(result);
      msgRef.current.value = null;
      fetchChat()
    } catch (error) {
      console.error("Error inserting data into DB", error);
    }
  };

  
  return (
    <div className="chat-frame">
      <div className="msg-display-area">
        {chat.map((item, index) => {
          console.log("item.receiver === selectedID: ",item.receiver === selectedID);
          return (
            <div key={item?.$id} style={{
              justifyContent: `${item?.receiver === selectedID ? "end":"start"}`,
              display:"flex"
            }} className="parent-chat-bubble">
            <div className="chat-bubble" key={item.$id}>
              {item.message}
            </div>
            </div>
          );
        })}
      </div>

      <div className="msg-send-area">
        <input
          ref={msgRef}
          type="text"
          placeholder="Enter Message..."
          autoFocus
        />
        <div className="msg__send_btn_outer">
          <AiOutlineSend size="22px" onClick={onSend} className="msg__send_btn_inner" />
        </div>
       
      </div>
    </div>
  );
}

export default Message;
