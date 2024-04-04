import React from 'react'
import "./Message.css";
function Message({ uid }) {
  console.log("uid: ",uid);
    return (
      <div class="chat-frame">
      <div class="msg-display-area">
        <div>
          <div class="chat-bubble">We are learning CSS right now!</div>
        </div>

        <div class="chat-bubble">
          Laxy is React Native Developer. Laxy is earning nice amount of
          money. So he wants donate all his wealth to Harsh. And Laxy is
          planning two child as well with second wife.
        </div>
        <div class="chat-bubble">Harsh is learning programming.</div>
      </div>
      <div class="msg-send-area">
        <input type="text" placeholder="Enter Message..." autofocus />
        <button type="button">Send</button>
      </div>
    </div>
  )
}

export default Message  