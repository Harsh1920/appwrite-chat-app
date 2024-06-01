import React, { useEffect, useState } from "react";
import { account, databases } from "../../lib/appwrite";
import "./ChatItem.css";
import { AiOutlineUser} from "react-icons/ai";
import { Query } from "appwrite";
import { COLLECTION_CHAT_ID, COLLECTION_USER_LIST_ID, DATABSE_ID } from "../../utils/constant";


const ChatItem = ({ setselectedID,selectedID }) => {
  const [userList, setUserList] = useState([]);
  
  const fetchUserList =async () => {
    const myInfo = await account.get();

    let userPromise = databases.listDocuments(DATABSE_ID, COLLECTION_USER_LIST_ID, [
      Query.notEqual("uid",myInfo?.$id)
      // Query.and([Query.lessThan("users", myInfo?.$id), Query.greaterThan("users", selectedID)])
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
              
              setselectedID(user.uid);

            }}
            className="chat-card"
            key={user.$id}
          >
            <AiOutlineUser size="26px" color={user.$id === selectedID && "white"}/>
            <h5 className={user.uid === selectedID && "chat-card_active"}>{user.user_name}</h5>
          </div>
        );
      })}
    </>
  );
};

export default ChatItem;
