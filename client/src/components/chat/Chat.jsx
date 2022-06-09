import './chat.css'
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

const Chat = () => {

    return (
    <div class="main__right">
      <div class="main__chat_window">
          <div class="messages">
          </div>
      </div>
      <div class="main__message_container">
        <input id="chat_message" type="text" autocomplete="off" placeholder="Type message here..."/>
        <div id="send" class="options__button">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </div>
      </div>
    </div>);
}

export default Chat;