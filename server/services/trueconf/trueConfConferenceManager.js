require('dotenv').config()
const {postExecute, getExecute, deleteExecute} = require('./trueConfConnectionService')
const TRUE_CONF_API_URL = process.env.TRUE_CONF_API_URL

createConference = async (id, password, user) => {
    try{
        console.log('creating conference in trueConf: id ' + id)
        let url = TRUE_CONF_API_URL + 'api/v3.4/conferences'
        var details = {
            'id' : id,
            'password' : password,
            'topic' : user.name,
            'owner' : user.id,
            'type' : 0
        };
        const response = await postExecute(url, details, true)
        console.log('createConference type: ' + JSON.stringify(response))
        return response
    }catch(e){
        console.log(e)
    }
}

getConference = async (id) => {
    try{
        let url = TRUE_CONF_API_URL + 'api/v3.4/conferences/' + id
        const response = getExecute(url, false)
        return response
    }catch(e){
        console.log(e)
    }
}

deleteConference = async (id) => {
    try{
        console.log('delete conference: ' + id)
        let url = TRUE_CONF_API_URL + 'api/v3.4/conferences/' + id
        const response = deleteExecute(url, true)
        return response
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    createConference,
    getConference,
    deleteConference
}