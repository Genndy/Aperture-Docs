require('dotenv').config()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const https = require('https')
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const TRUE_CONF_API_URL = process.env.TRUE_CONF_API_URL

registration = async (login_name, password, email) => {
    try{
        console.log('creating account in trueConf: name ' + login_name + ' password: ' + password + ' email: ' + email)
        let url = TRUE_CONF_API_URL + "api/v3.3/users?access_token=c03ccc7169ba557154c86ad238ed8a9ae23f7bc1";
        var details = {
            'login_name': login_name,
            'password': password,
            'email': email
        };
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        const agent = new https.Agent({
            rejectUnauthorized: false
        })
        console.log('try to fetch: ' + url)
        
        var json 

        var response = await fetch(url, 
        { method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody})

//        const data = await response.json()


        console.log(JSON.stringify(data))
//            https://25.44.145.13/api/v3.3/users?access_token=c03ccc7169ba557154c86ad238ed8a9ae23f7bc1
//            https://25.44.145.13/api/v3.3/users?access_token=c03ccc7169ba557154c86ad238ed8a9ae23f7bc1
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    registration
}