import React, {useEffect} from 'react';
import {deleteConference} from './conference/conferenceManager'
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Switch} from "react-router-dom";
import {setPage} from "../../reducers/pageReducer"
import icFiles from '../../assets/img/ic-files.svg';
import icFilesSelected from '../../assets/img/ic-files-selected.svg';
import icVideochat from '../../assets/img/ic-videochat.svg';
import icVideochatSelected from '../../assets/img/ic-videochat-selected.svg';
import IconButton from '../custom/Buttons';
import { setChatToSide, setFilesToSide } from '../../reducers/fileReducer';
import Disk from '../disk/Disk';
import Chat from '../chat/Chat';
import './videochat.css';

const Videochat = () => {
    const dispatch = useDispatch()
    const currentConference = useSelector(state => state.conference.currentConference)
    const sideItem = useSelector(state => state.files.currentItem)
    const currentUser = useSelector(state => state.user.currentUser)
    const conferenceJSON = JSON.stringify(currentConference).replaceAll('\\', '')
    const conferenceID = JSON.parse(currentConference.conference.id) + ''
    const conferenceOwnerID = JSON.parse(conferenceJSON)['conference']['invitations'][0]['id'] // Крайне ненадёжное решение. Крайне. ОЧЕНЬ. Дырка в безопасности системы.
    const currentUserID = currentUser.id + ''
    console.log('owner ID: ' + conferenceOwnerID)
    console.log('currentUserID: ' + currentUserID)
    var url = 'https://25.44.145.13/c/' + conferenceID



    return (
        <div className='container'> 
            {/* ****************** */}
            <div className='videochat_container'>
            <iframe allowfullscreen="allowfullscreen" width="720" height="405" allow="microphone; camera; autoplay; display-capture; chatsl fullscreen" src={url}></iframe>
            {conferenceOwnerID == currentUserID ? 
            <Switch>
                <button className="" onClick={() => dispatch(deleteConference(conferenceID))}>Отключить конференцию</button>
            </Switch> : <Switch></Switch>}
            </div>
            {/* ****************** */}

            <div>
            <div className="navbar__tabs">
                    {sideItem == 'CHAT' ?
                    <Switch>
                        <IconButton image={icVideochatSelected}  onClick={() => dispatch(setChatToSide())}/>
                    </Switch> :  
                    <Switch>
                            <IconButton image={icVideochat} onClick={() => dispatch(setChatToSide())}/>
                    </Switch>}

                    {sideItem == 'FILES' ? 
                    <Switch>
                        <IconButton image={icFilesSelected} onClick={() => dispatch(setFilesToSide())} />
                    </Switch> :  
                    <Switch>
                        <IconButton image={icFiles} onClick={() => dispatch(setFilesToSide())} />
                    </Switch>}
                        <IconButton image={icFiles} onClick={() => {console.log('item: ' + sideItem)}}/>
                </div>
                {sideItem == 'CHAT' ?
                    <Switch>
                        <Chat/>
                    </Switch> :
                    <Switch>
                        <Disk/>
                    </Switch>}
            </div>
        </div>)
}

export default Videochat;