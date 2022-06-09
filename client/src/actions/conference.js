import axios from 'axios'
import {setConference} from "../reducers/conferenceReducer";
import {disconnectConference} from "../reducers/conferenceReducer"
import {TRUE_CONF_API_URL} from "../config";

export const connectToConference = async (conferenceID, password) => { // Здесь будем создавать конференцию
    console.log('connectToConference: ' + conferenceID)
    return async dispatch => {
        try { 
            dispatch()
        } catch (e) {
            console.log('Ошибка подключения, connecToConference failed: ' + e)
            alert(e.response.data.message)
        }
    }
}

export const handUpConference = () => {
    return async dispatch => {
        try {
            dispatch(disconnectConference())
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}