const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config()
const { TrueConfToken } = require('../../models/models')
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const TRUE_CONF_API_URL = process.env.TRUE_CONF_API_URL

async function postExecute(url, details, auth){
    if(auth == true){
        url = url + '?access_token=' + await authTrueConf()
        console.log('auth test url: ' + url)
    }
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    console.log('try to fetch ' + url)
    formBody = formBody.join("&");
    var response = await fetch(url, 
        { method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody}).then()
    console.log()
    return await response.json();
}

async function getExecute(url, auth){
    if(auth){
        url = url + '?access_token=' + await authTrueConf()
    }
    console.log('try to fetch ' + url)
    var response = await fetch(url, 
        { method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }}).then()
    return await response.json();
}

async function deleteExecute(url, auth){
    if(auth){
        url = url + '?access_token=' + await authTrueConf()
    }
    console.log('try to delete ' + url)
    var response = await fetch(url,
        { method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Access-Control-Allow-Methods': "GET, POST, PUT, DELETE",
            'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept"
    }}).then()
    return await response.json();
}

/**********/

async function authTrueConf(){
    const id = 0
    var prepareToken = await TrueConfToken.findOne({where: {id}})
    console.log('authTrueConf ***')
    if(!prepareToken){ // Токена нет в базе данных
        console.log('authTrueConf - токена не было в базе данных, попытка создать новый токен')
        prepareToken = await createToken()
        sleep(10000); // КОСТЫЫЫЫЫЫЛЬ!!!!
    }else{ // Token существует
        if(new Date(prepareToken.expiresIn).getTime() <= (Date.now() + 60000)){
            console.log('authTrueConf - срок годности токена истекла, попытка создать новый токен')
            prepareToken = await createToken()
            sleep(10000); // КОСТЫЫЫЫЫЫЛЬ!!!!
        }else{
        }
    }
    return prepareToken.token
}

async function createToken(){
    const url = TRUE_CONF_API_URL + '/oauth2/v1/token'
    const details = {
        'client_id' : '762492ff9f00994b537e70c0cc1b1275c2d4e345',
        'client_secret' : '11e6b72e3d748d18b543d022f17a3cbc509eca81',
        'grant_type' : 'client_credentials'
    };
    const tokenResponse = await postExecuteAndGetJSON(url, details, false)
    // Надо создать токен
    const tokenValue = tokenResponse.access_token
    const tokenExpiresInMillis = tokenResponse.expires_in * 1000 // Возвращает в секундах, преобразовываем в миллисекунды
    const dateNow = Date.now() // Date.now() возвращает текущее время в миллисекундах
    const expiresIn = dateNow + tokenExpiresInMillis
    const token = await TrueConfToken.findOrCreate({
        where: { id: 0 }, 
        defaults: {token: tokenValue, expiresIn: expiresIn}
    });
    token[0].token = tokenValue
    token[0].expiresIn = expiresIn
    await token[0].save()
    return token[0]
}

async function postExecuteAndGetJSON(url, details){
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    console.log('try to fetch ' + url)
    formBody = formBody.join("&");
    var responseStatus = 500
    const response = await fetch(url, 
        { method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody})
    if(response.status == 200){
        const responseData = await response.json()
        return await responseData;
    }else{
        console.log('Научите выбрасывать исключения плиз :с ' + responseStatus)
//        throw new Error('response status is: ' + response.status + ' check your trueConfServer is on and path to it')
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  

module.exports = {
	postExecute,
    getExecute,
    deleteExecute
}