import axios from 'axios'
import {setConference} from "../reducers/conferenceReducer";
import {TRUE_CONF_API_URL} from "../config";

export const createConference = async (conferenceID, password) => { // Здесь будем создавать конференцию
    var conferenceID // нужно получить номер конференции
    try {
        // Нужно обратиться в API TrueConf и используя ID приложения и токен - создать конференцию... 
        // А ещё лучше - обратиться на наш сервер, который будет курировать сервера...
        const response = await axios.post(`${TRUE_CONF_API_URL}c/${conferenceID}`, { 
            id,
            password
        })
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const connectToConference =  (email, password) => { // Здесь будет подключение к конференции
    return async dispatch => { 
        try {
            const response = await axios.post(`${API_URL}api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const auth =  () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/auth/auth`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            localStorage.removeItem('token')
        }
    }
}

export const uploadAvatar =  (file) => {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await axios.post(`${API_URL}api/files/avatar`, formData,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteAvatar =  () => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/files/avatar`,
                {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
            )
            dispatch(setUser(response.data))
        } catch (e) {
            console.log(e)
        }
    }
}
