import React, { useEffect, useRef, useState } from "react";
import "./Message.css";
import { ID, account, databases } from "../../lib/appwrite";
import { AiOutlineSend} from "react-icons/ai";
import { Query } from "appwrite";
import { COLLECTION_CHAT_ID, DATABSE_ID } from "../../utils/constant";



function Message({  selectedID }) {
  const [chat, setChat] = useState([]);
  const div = useRef(null);

  const msgRef = useRef(null);

  const fetchChat = async () => {
    setChat([])
    const myInfo = await account.get();
    console.log("myInfo: ", myInfo);
    console.log('databases: ',databases);
    let promise = databases.listDocuments(DATABSE_ID, COLLECTION_CHAT_ID, [                
      Query.or([Query.equal("id1", myInfo?.$id+"_"+selectedID ), Query.equal("id1", selectedID+"_"+myInfo?.$id)])      
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
  useEffect(() => {
    
    const unsubscribe = account.client.subscribe(`databases.${DATABSE_ID}.collections.${COLLECTION_CHAT_ID}.documents`,async response => {    
    
      if (response.events.includes("databases.*.collections.*.documents.*.create")) {
        const myInfo = await account.get();

        console.log('A MESSAGE WAS CREATED', response.payload)
        const payload = response.payload;
        const { id1,id2 } = payload;
        if (id1 === myInfo?.$id + "_" + selectedID || id1 === selectedID + "_" + myInfo?.$id  ) {
          console.log("id1 true codi...");
          setChat(prevState => [ ...prevState,payload]) 
        }
        //   // filterMsg(response.payload)

        //   console.log("payload?.uids?.some(user?.uid): ",payload?.uids?.some((data)=> data == user?.uid));
          
        //   if (payload?.uids?.some((data)=> data == user?.uid)) {
        //     setMessages(prevState => [payload, ...prevState])  
        //   }
          
      }
  
      if(response.events.includes("databases.*.collections.*.documents.*.delete")){
          console.log('A MESSAGE WAS DELETED!!!')
          // setMessages(prevState => prevState.filter(message => message.$id !== response?.payload?.$id))
      }
      if (response.events.includes("databases.*.collections.*.documents.*.update")) {
        const payload = response.payload;      
        console.log("payload: ",payload);
        // if (payload?.uids?.some((data)=> data == user?.uid)) {
        //   setMessages(prevState =>
        //   prevState.map(obj => {              
        //      return obj.$id === payload?.$id ? {...payload} : {...obj}
        //   }))  
        // }
      }
    });
    return  () => {
      unsubscribe()
    }
  }, []);



  const onSend = async () => {
    // send data to collection
    const msg = msgRef.current.value;
    if (msg === "") {
      return;
    }
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
      div.current.scrollIntoView({ behavior: "smooth", block: "end" })

      // fetchChat()
    } catch (error) {
      console.error("Error inserting data into DB", error);
    }
  };

  
  return (
    <div className="chat-frame">
      <div className="msg-display-area "  >
        {chat.length >0? chat.map((item, index) => {
          console.log("item.receiver === selectedID: ",item.receiver === selectedID);
        return (
            <div ref={div} key={item?.$id} style={{
              justifyContent: `${item?.receiver === selectedID ? "end":"start"}`,
              display:"flex"
            }} className="parent-chat-bubble">
              <div
                className="chat-bubble"
                key={item.$id}>
              {item.message}
            </div>
            </div>
          );
        }) :
          <div style={{
            display:'flex',
            justifyContent: "center",            
            alignItems:"center",
            height:"100%"
            
        }}>
          <h3 className="msg__selectMsgHint_txt">
              Message Not Found
            </h3>
        </div>
        }
      </div>

      <div className="msg-send-area">
        <input
          ref={msgRef}
          type="text"
          placeholder="Enter Message..."
          onKeyDown={(e) => {
            if (e.key === "Enter")
                onSend();
            }}
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
