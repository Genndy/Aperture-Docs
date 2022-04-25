require('dotenv').config()
const {execute} = require('./trueConfConnectionService')

// const { createConference } = require('../../controllers/trueConfController');

const TRUE_CONF_API_URL = process.env.TRUE_CONF_API_URL

createConference = async (id, password, user) => {
    try{
        console.log('creating conference in trueConf: id ' + id)
        let url = TRUE_CONF_API_URL + 'api/v3.4/conferences?access_token=c03ccc7169ba557154c86ad238ed8a9ae23f7bc1'
        var details = {
            'id' : id,
            'topic' : user.name,
            'owner' : user.id,
            'type' : 0
        };
        execute()
        // Нужно как-то интерпретировать получаемое 
        return response
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    createConference
}