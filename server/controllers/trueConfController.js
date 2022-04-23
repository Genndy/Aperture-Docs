const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {TrueConfToken} = require('../models/models')
const https = require('https')

const trueConf = require('../services/trueconf/trueConfAccountManager');
const { text } = require('express');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const server = 'https://25.44.145.13/'
const client_id = "762492ff9f00994b537e70c0cc1b1275c2d4e345";
const client_secret = "11e6b72e3d748d18b543d022f17a3cbc509eca81";

var api_params = {
	"access_token":"", 
	"group_id":0, 
	"conference_id":0,
	"retries_count":0, 
	"prev_operator_id":""
};

class TrueConfController{
    async auth(req, res){ // Нужно получить токен с сервера
        try{
            let url = server + "/oauth2/v1/token";
            var details = {
                'client_id': '762492ff9f00994b537e70c0cc1b1275c2d4e345',
                'client_secret': '11e6b72e3d748d18b543d022f17a3cbc509eca81',
                'grant_type': 'client_credentials'
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
            var token = ''
            var expiresIn = Date.now()
            
            var response = await fetch(url, 
            { method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody})

            const data = await response.json()
//                .then(res => res.text())
//                .then(text => console.log(expiresIn + JSON.parse(text)["expires_in"]))
            console.log('expiresIn: ' + (expiresIn + data["expires_in"]))
            console.log('access_token: ' + data["access_token"])

        }catch(e){
            console.log(e)
            res.send({message: "Server error"})
        }
    }

    // user

    async register(req, res){
        try {
            // Проверить req на наличие юзера
            // Отправить данные дальше в trueConf с попыткой создать аккаунт там. Хммм. А чо бы...
            // Ладно, для теста и этого хватит. Значится, будем делать следующее:

            if (!errors.isEmpty()) { // Надобно получить 
                return res.status(400).json({message: "Uncorrect request", errors})
            }
            const {email, password} = req.body
            const candidate = await User.findOne({where: {email}})
            console.log(email)
            if(candidate) {
                return res.status(400).json({message: `User with email ${candidate.email} already exist`})
            }
            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({email, password: hashPassword})
            await user.save()
            await fileService.createDir(new File({userId : user.id, name: ''}))
            res.json({message: "User was created"})
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    }

    async removeUser(req, res){

    }

    // conference

    async createConference(req, res){}
    async removeConference(req, res){}
    async conference(req, res){}

    // 

    
}

async function getApiData(url, request_type, body_encoding = "json", body_content = ""){
	let response;
    
	if (request_type == "GET"){ 
//        response += 
		// response = await fetch(url);
	}
	else{ 
		response = await fetch(url, {
			method: request_type,
			headers: {
				"Content-Type": "application/" + body_encoding
			},
			body: body_content
		});
	}

	let json_data = await getJsonResponse(response);

	return json_data;
}

async function getJsonResponse(response){
	if (response.ok){
		let json_data = await response.json();
		checkApiError(json_data);
		return json_data;
	}
	else{
		throw new Error("Error while fetch data " + response.status + ", message = '" + response.message + "'");
	}
}

function checkApiError(json_data){
	if("error" in json_data){
		console.log(json_data);
		throw new Error("Request returned error '" + json_data.error + "' with message '" + json_data.error_description + "'");
	}
}

module.exports = new TrueConfController()

// fetch(url, {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//     },
//     body: formBody})
//         .then(res => res.text())
//         .then(text => console.log(text))
//         .then(res.json({message: res.access_token}))
// }