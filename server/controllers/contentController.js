const uuid = require('uuid')
const path = require('path')
const {Content} = require('../models/models')
const ApiError = require('../error/ApiError')

class ContentController {
    async getAll(req, res) {
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let contents;
        contents = await Content.findAndCountAll({limit, offset})
        return res.json(contents)
    }

    async create(req, res, next){
        try{
            let {docx, img, description} = req.body
            let docFileName = uuid.v4() + ".docx"
            let imgFileName = uuid.v4() + ".img"
            img.mv(path.resolve(__dirname, '..', 'static', imgFileName))
            docFileName.mv(path.resolve(__dirname, '..', 'static', imgFileName))
            const content = await Content.create({docx, imgFileName, description})
            return res.json(content)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res) {
        //  const {id} = req.id
    }

    async removeOne(req, res){
        
    }
}

module.exports = new ContentController()