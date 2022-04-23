export default async function getApiData(url, request_type, body_encoding = "json", body_content = ""){
	let response;

	if (request_type == "GET"){ 
		response = await fetch(url);
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