import React from 'react'
import "./Message.css";
function Message() {
    return (
      <>
      <div className='msg-section'>
          {/* msg by friend */}
          <div className='friend-msg'>
              <p>Friend Messages</p>
          </div>
          
          {/* msg by me */}
          <div className='my-msg'>
              <p>My Messages</p>
          </div>
     </div>
    </>
  )
}

export default Message  