import React, { useEffect, useState } from "react";
import icon from "../../assets/react.svg";
import { ID, account, databases } from "../../lib/appwrite";
import "./ChatItem.css";

const DATABASE_ID = "660c34d27dde81eeac4c";
const COLLECTION_ID = "660c350aec53973fc11d";

const ChatItem = ({ setselectedID }) => {
  const [userList, setUserList] = useState([]);

  const fetchUserList = () => {
    let userPromise = databases.listDocuments(DATABASE_ID, COLLECTION_ID);
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
      {userList.map((user) => {
        return (
          <div
            onClick={() => {
              console.log(user.$id);
              setselectedID(user.$id);
            }}
            className="chat-card"
            key={user.$id}
          >
            <img src={icon} alt="Person Avtar" />
            <h5>{user.user_name}</h5>
          </div>
        );
      })}
    </>
  );
};

export default ChatItem;
