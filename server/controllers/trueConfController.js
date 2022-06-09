const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {Conference, User, File} = require('../models/models')
const https = require('https')
const {check, validationResult} = require("express-validator")
const fileService = require('../services/fileService')

const trueConfAccountManager = require('../services/trueconf/trueConfAccountManager');
const trueConfConferenceManager = require('../services/trueConf/trueConfConferenceManager');

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
            var expiresIn = Date.now()
            
            var response = await fetch(url, 
            { method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody})

            const data = await response.json()
            console.log('expiresIn: ' + (expiresIn + data["expires_in"]))
            console.log('access_token: ' + data["access_token"])
            
        }catch(e){
            console.log(e)
            res.send({message: "Server error"})
        }
    }
    // conference
    async createConference(req, res){
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Uncorrect request (trueConfController)", errors})
            }
            const {id, password, email} = req.body
            const user = await User.findOne({where: {email}})
            if(!user){
                return res.status(400).json({message: 'doesn\'t ' + email + ' exist user cannot create conference'})
            }
            const conferenceCandidate = await Conference.findOne({where: {id}})
            if(conferenceCandidate){
                return res.status(400).json({message: 'conference with id ' + conference.id + ' already exist'})
            }
            const userId = user.id
            const conference = await Conference.create({id, password, userId})
            console.log('creating file: ' + conference.id)
            const file = await new File({name : conference.id, path: '\\' + conference.id , type: ''})
            await fileService.createDir(file)
            user.conferenceId = conference.id
            await user.save()
            await file.save()
            console.log('file: ' + file)
            console.log('file conference id: ' + user.conferenceId)
            const conferenceLink = await trueConfConferenceManager.createConference(id, password, user)
            console.log('\n**********************')
            if(conferenceLink != 'null'){
                console.log('trueConfController conferenceLink: ' + conferenceLink)
                return res.status(200).json(conferenceLink)
            }else{
                res.send({message: "Server error: link didn\'t created"})
            }
        } catch (e) {
            console.log('conferenceController error: ' + e)
        }
    }
    async connectToConference(req, res){
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) { return res.status(400).json({message: "Uncorrect request (trueConfController)", errors}) }
            const {id, password, email} = req.body
            const user = await User.findOne({where: {email}})
            if(!user){ 
                return res.status(400).json({message: 'doesn\'t ' + email + ' exist user cannot create conference'})
            }
            const conferenceCandidate = await Conference.findOne({where: {id}}) 
            if(!conferenceCandidate){
                return res.status(400).json({message: 'conference with id ' + id + ' doesn\'t exist'})
            }
            if(conferenceCandidate.password != password) {
                return res.status(400).json({message: 'invalid password'})
            }
            const response = await trueConfConferenceManager.getConference(id)
            return res.status(200).json(response)
        } catch (e) {
            console.log('conferenceController get conference: ' + e)
        }
    }    

    async removeConference(req, res){
        try {
            console.log('Таки запрос пришёл')
            const errors = validationResult(req)
            if (!errors.isEmpty()) { return res.status(400).json({message: "Uncorrect request (trueConfController)", errors}) }
            const {id} = req.body
            const conferenceCandidate = await Conference.findOne({where: {id}}) 
            if(!conferenceCandidate){
                return res.status(400).json({message: 'conference with id ' + id + ' doesn\'t exist'})
            }
            const response = await trueConfConferenceManager.deleteConference(id)
            await conferenceCandidate.destroy()
            return res.status(200).json(response)
        } catch (e) {
            console.log('removeConference error: ' + e)
        }
    }
}

module.exports = new TrueConfController()