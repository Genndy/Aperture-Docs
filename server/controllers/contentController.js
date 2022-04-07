const uuid = require('uuid')
const path = require('path')

const ApiError = require('../error/ApiError')
const {Test} = require('../models/models')

class UserController {
    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let tests;
        tests = await Test.findAndCountAll({limit, offset})
        return res.json(tests)
    }

    async create(req, res, next){
        try{
            let {docx, img, description} = req.body
//            const {message} = req.body
//            const {img} = req.files

            let docFileName = uuid.v4() + ".docx"
            let imgFileName = uuid.v4() + ".img"
            img.mv(path.resolve(__dirname, '..', 'static', imgFileName))
            link.mv(path.resolve(__dirname, '..', 'static', imgFileName))
            const test = await Test.create({docx, imgFileName, description})
            return res.json(test)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res) {
//        const {id} = req.id
    }

    async removeOne(req, res){
        
    }
}

module.exports = new UserController()