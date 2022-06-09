require('dotenv').config()
const {postExecute} = require('./trueConfConnectionService')

 const TRUE_CONF_API_URL = process.env.TRUE_CONF_API_URL

registration = async (id, first_name, password, email) => {
    try{
        console.log('creating account in trueConf: name: ' + first_name + ' password: ' + password + ' email: ' + email)
        let url = TRUE_CONF_API_URL + "api/v3.3/users";
        var details = {
            'login_name' : id,
            'display_name' : first_name,
            'password': password,
            'email': email
        };
        const response =  postExecute(url, details, true)
        return(response)
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    registration
}