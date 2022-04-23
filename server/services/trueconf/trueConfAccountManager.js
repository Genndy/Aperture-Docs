require('dotenv').config()
// import axios from 'axios'
// import getApiData from './trueConfConnectionService'

const TRUE_CONF_API_ID = process.env.TRUE_CONF_API_ID
const TRUE_CONF_API_SECRET = process.env.TRUE_CONF_API_SECRET
const TRUE_CONF_API_URL = process.env.TRUE_CONF_API_URL

// export const auth =  (email, password) => {
//     return async dispatch => {
//         try {
//             const response = await axios.get(`${TRUE_CONF_API_URL}api/auth/auth`,
//                 {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
//         } catch (e) {

//         }
//         // try {
//         //     const response = await axios.get(`${TRUE_CONF_API_URL}api/auth/auth`,
//         //         {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
//         //     )
//         //     dispatch(setUser(response.data.user))
//         //     localStorage.setItem('true_conf_token', response.data.token)
//         // } catch (e) {
//         //     localStorage.removeItem('token')
//         // }
//     }
// }

// export const registration = async () => {
//     try {
//         let url = `${TRUE_CONF_API_URL}oauth2/v1/token`
//         let json_data = await getApiData(url, "POST", "x-www-form-urlencoded", 
// 		"grant_type=client_credentials&client_id=" + TRUE_CONF_API_ID + "&client_secret=" + TRUE_CONF_API_SECRET)
//         console.log(json_data)
//     } catch (e) {

//     }
// }

// export const login =  (email, password) => {
//     return async dispatch => {
//         try {
//             const response = await axios.post(`${API_URL}api/auth/login`, {
//                 email,
//                 password
//             })
//             dispatch(setUser(response.data.user))
//             localStorage.setItem('token', response.data.token)
//         } catch (e) {
//             alert(e.response.data.message)
//         }
//     }
// }

// export const uploadAvatar =  (file) => {
//     return async dispatch => {
//         try {
//             const formData = new FormData()
//             formData.append('file', file)
//             const response = await axios.post(`${API_URL}api/files/avatar`, formData,
//                 {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
//             )
//             dispatch(setUser(response.data))
//         } catch (e) {
//             console.log(e)
//         }
//     }
// }

// export const deleteAvatar =  () => {
//     return async dispatch => {
//         try {
//             const response = await axios.delete(`${API_URL}api/files/avatar`,
//                 {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}}
//             )
//             dispatch(setUser(response.data))
//         } catch (e) {
//             console.log(e)
//         }
//     }
// }