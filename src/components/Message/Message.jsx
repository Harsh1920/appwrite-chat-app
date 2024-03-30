import React from 'react'
import "./Message.css";
function Message({ uid }) {
  console.log("uid: ",uid);
    return (
      <>
      <div className='msg-section'>
          {/* msg by friend */}
          
          {/* msg by me */}
          { uid === "mine" ? <div className='my-msg'>
            <p>My Messages</p>
            </div>:
            <div className='friend-msg'>
              <p>Friend Messages</p>
          </div>
          }
     </div>
    </>
      
  //   <div class="message">
  //   <div class="message__outer">
  //     <div class="message__avatar"></div>
  //     <div class="message__inner">
  //       <div class="message__bubble"></div>
  //       <div class="message__actions"></div>
  //       <div class="message__spacer"></div>
  //     </div>
  //     {/* <div class="message__status"></div> */}
  //   </div>
  // </div>
  )
}

export default Message  