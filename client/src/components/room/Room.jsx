import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Input from "../../utils/input/Input"
import './room.css';
import '../style.css';
import {createConference} from '../videochat/conference/conferenceManager'
import { connectToConference } from '../videochat/conference/conferenceManager';

const Room = () => {
    const [createConferenceId, createConferenceSetId] = useState("")
    const [createConferencePassword, createConferenceSetPassword] = useState("")
    const [connectConferenceId, connectConferenceSetId] = useState("")
    const [connectConferencePassword, connectConferenceSetPassword] = useState("")
    const currentUser = useSelector(state => state.user.currentUser)
    // Достать надобно ID конференции никем не занятый
    const dispatch = useDispatch()
    return (
        <div className="room"> 
            <div>
            Создать конференцию
            <div className="room__create_conference_container styled_container">
                <Input value={createConferenceId} setValue={createConferenceSetId} className='text' type="text" placeholder="ID Конференции"/>
                <Input value={createConferencePassword} setValue={createConferenceSetPassword} className='text' type="password" placeholder="Пароль"/>
                <button className="button" onClick={() => dispatch(createConference(createConferenceId, createConferencePassword, currentUser.email))}>Создать конференцию</button>           
            </div>
            </div>
            <div>
            Подключиться к конференции
            <div className="room__connect_conference_container styled_container">
                <Input value={connectConferenceId} setValue={connectConferenceSetId} className='text' type="text" placeholder="ID Конференции"/>
                <Input value={connectConferencePassword} setValue={connectConferenceSetPassword} className='text' type="password" placeholder="Пароль"/>
                <button className="button" onClick={() => dispatch(connectToConference(connectConferenceId, connectConferencePassword, currentUser.email))}>Подключиться к конференции</button>
            </div>
            </div>
        </div>
    )
}

export default Room;