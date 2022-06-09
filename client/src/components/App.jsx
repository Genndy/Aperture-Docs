import React, {useEffect} from 'react';
import Navbar from "./navbar/Navbar";
import './app.css'
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Registration from "./authorization/Registration";
import Login from "./authorization/Login";
import {useDispatch, useSelector} from "react-redux";
import Disk from "./disk/Disk";
import Profile from "./profile/Profile";
import Videochat from "./videochat/Videochat";
import Room from "./room/Room";
import {handUpConference} from '../actions/conference';
import {auth} from "../actions/user";

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const onConference = useSelector(state => state.conference.onConference)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(auth())
        dispatch(handUpConference())
    }, [])


    return (
        <BrowserRouter>
            <div className='app'>
                <Navbar/>
                <div className="wrap">
                    {!isAuth ?
                        <Switch>
                            <Route path="/registration" component={Registration}/>
                            <Route path="/login" component={Login}/>
                            <Redirect to='/login'/>
                        </Switch>
                        : onConference?
                        <Switch>
                            <Route exact path="/videochat" component={Videochat}/>
                            {/* <Route exact path="/disk" component={Disk}/> */}
                            <Route exact path="/profile" component={Profile}/>
                            <Redirect to="/videochat"/>
                        </Switch>
                        :
                        <Switch>
                            <Route exact path="/profile" component={Profile}/>
                            <Route exact path="/room" component={Room}/>
                            <Redirect to="/room" />
                        </Switch>
                    }
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;