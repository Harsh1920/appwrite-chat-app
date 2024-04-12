import React, { useEffect, useRef, useState } from "react";
import "./Message.css";
import { ID, account, databases } from "../../lib/appwrite";
import { AiOutlineSend} from "react-icons/ai";

const DATABASE_ID = "660c34d27dde81eeac4c";
const COLLECTION_ID = "660ed72fd87cd8131f51";

function Message({ uid, selectedID }) {
  const [chat, setChat] = useState([]);

  const msgRef = useRef(null);

  const fetchChat = () => {
    let promise = databases.listDocuments(DATABASE_ID, COLLECTION_ID);

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
  }, []);

  const onSend = async () => {
    // send data to collection
    const msg = msgRef.current.value;
    console.log("msg: ", msg);
    const myInfo = await account.get();

    try {
      const result = await databases.createDocument(
        "660c34d27dde81eeac4c",
        "660ed72fd87cd8131f51",
        ID.unique(),
        { message: msg, sender: myInfo.$id, receiver: selectedID }
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
        {chat.map((item, index) => {
          return (
            <div className="chat-bubble" key={item.$id}>
              {item.message}
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
          <AiOutlineSend size="22px" className="msg__send_btn_inner" />
        </div>
        {/* <button onClick={onSend} type="button">
          Send
        </button> */}
      </div>
    </div>
  );
}

export default Message;
