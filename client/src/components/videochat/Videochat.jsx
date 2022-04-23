import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../../reducers/pageReducer"
// import {deleteAvatar, uploadAvatar} from "../../actions/user"; // Тут надо методы для видосов вытянуть

const Videochat = () => {
    const dispatch = useDispatch()
    dispatch(setPage('VIDEOCHAT'))
    const pageReducerSelector = useSelector(state => state.user.isAuth)

    return (<div>
            <div className="header">
                <div className="logo">
                    <div className="header__back">
                    <i className="fas fa-angle-left"></i>
                    </div>
                    <h3>Video Chat</h3>
                </div>
                </div>  
                <div className="main">  
                <div className="main__left">
                <div className="videos__group">
                <iframe allowfullscreen="allowfullscreen" width="720" height="405" allow="microphone; camera; autoplay; display-capture; chatsl fullscreen" src="https://25.44.145.13/c/5288251045"></iframe>
                    <div id="video-grid">

                    </div>
                </div>
                <div className="options">
                    <div className="options__left">
                    <div id="stopVideo" className="options__button">
                        <i className="fa fa-video-camera"></i>
                    </div>
                    <div id="muteButton" className="options__button">
                        <i className="fa fa-microphone"></i>
                    </div>
                    <div id="showChat" className="options__button">
                        <i className="fa fa-comment"></i>
                    </div>
                    </div>
                    <div className="options__right">
                    <div id="inviteButton" className="options__button">
                        <i className="fas fa-user-plus"></i>
                    </div>
                    </div>
                </div>
                </div>
                <div className="main__right">
                <div className="main__chat_window">
                    <div className="messages">

                    </div>
                </div>
                <div className="main__message_container">
                    <input id="chat_message" type="text" autocomplete="off" placeholder="Type message here..." />
                    <div id="send" className="options__button">
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    </div>
                </div>
                </div>
            </div>
        </div>)
}

export default Videochat;