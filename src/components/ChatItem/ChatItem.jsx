import React, { useEffect, useState } from "react";
import { databases } from "../../lib/appwrite";
import "./ChatItem.css";
import { AiOutlineUser} from "react-icons/ai";
import { Query } from "appwrite";

const DATABASE_ID = "660c34d27dde81eeac4c";
const COLLECTION_ID = "660c350aec53973fc11d";

const ChatItem = ({ setselectedID,selectedID }) => {
  const [userList, setUserList] = useState([]);
  
  const fetchUserList = () => {
    let userPromise = databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      
    ]);
    userPromise.then(
      function (response) {
        console.log("User List:", response);
        const userList = response.documents;
        setUserList(userList);
      },
      function (error) {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  // function redirectToChat(id) {
  //   console.log("id: ", id);
  //   setselectedID(id);
  // }

  return (
    <>
      {userList.map((user,index) => {
        return (
          <div
            onClick={() => {
              console.log(user.$id);
              setselectedID(user.$id);

            }}
            className="chat-card"
            key={user.$id}
          >
            <AiOutlineUser size="26px" color={user.$id === selectedID && "white"}/>
            <h5 className={user.$id === selectedID && "chat-card_active"}>{user.user_name}</h5>
          </div>
        );
      })}
    </>
  );
};

export default ChatItem;
