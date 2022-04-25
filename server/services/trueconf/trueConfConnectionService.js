const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const https = require('https');
const {TrueConfToken} = require('../../models/models')

// export default async function getApiData(url, request_type, body_encoding = "json", body_content = ""){
// 	let response;

// 	if (request_type == "GET"){ 
// 		response = await fetch(url);
// 	}
// 	else{ 
// 		response = await fetch(url, {
// 			method: request_type,
// 			headers: {
// 				"Content-Type": "application/" + body_encoding
// 			},
// 			body: body_content
// 		});
// 	}

// 	let json_data = await getJsonResponse(response);

// 	return json_data;
// }

const execute = async (url, formBody) => {
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
        body: formBody})

    return formBody;
}

module.exports = {
	execute
}