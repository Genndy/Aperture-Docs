import axios from 'axios'
import {setUser} from "../../../reducers/userReducer";
// import { connectToConference } from '../../../actions/conference';
import {API_URL} from "../../../config";
import { setConference, disconnectConference } from '../../../reducers/conferenceReducer';

export const deleteConference = (conferenceID) => {
    return async dispatch => {
        console.log('delete conference headers ' + localStorage.getItem('token'))
        try {
            const response = await axios.post(`${API_URL}api/trueConf/removeConference`, 
            {id : conferenceID},
            {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).then()
            if(response.status == 200){
                dispatch(disconnectConference())
            }
            console.log('delete conference headers ' + response.headers[0])
        }catch (e) {
            console.log('error disconnectFromConference: ' + e)
        }
    }
}

export const createConference = (conferenceID, password, email) => {
    return async dispatch => {
        try {
            var responseData
            const response = await axios.post(`${API_URL}api/trueConf/createConference`, 
            {id : conferenceID, password, email}, 
            {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).then(res => responseData = res.data) // Мы же должны были что-то получить?
            if(response.status = 200){
                console.log('response data: ' + JSON.stringify(responseData))
                dispatch(setConference(responseData))
            }else{
                // А потом тут надо будет как-то отрисовывать ошибку на самом сайте.
                console.log('error: ' + response.status + ' ' + JSON.stringify(responseData))
            }
        } catch (e) {
            console.log('error: conferenceManager: createConference ' + e)
            alert(e.response.data.message)
        }
    }
}

export const connectToConference = (conferenceID, password, email) => {
    return async dispatch => {
        // Попытаться найти конференцию с соответствующим id
        var responseData
        const response = await axios.post(`${API_URL}api/trueConf/connectToConference`, 
        {id : conferenceID, password, email}, 
        {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}).then(res => responseData = res.data) // Мы же должны были что-то получить?
        if(response.status = 200) {
            dispatch(setConference(responseData))
        }else{
            alert('error: ' + response.status + ' ' + JSON.stringify(responseData))
        }
    }
}

export const login = (id, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/conference/login`, {
                id,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}