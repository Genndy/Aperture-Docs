const fs = require('fs')
const File = require('../models/models')
const config = require('config')

class FileService {

    createDir(file) {
        console.log('FileService create file: ' + file + ', ' + file.conferenceId + '\\' + file.path)

//        const filePath = `${config.get('filePath')}\\${file.name}\\${file.path}`
        const filePath = `${config.get('filePath')}\\${file.path}`

        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: "File already exist"})
                }
            } catch (e) {
                console.log(e)
                return reject({message: 'File error'})
            }
        }))
    }

    deleteFile(file) {
        const path = this.getPath(file)
        if (file.type === 'dir') {
            fs.rmdirSync(path)
        } else {
            fs.unlinkSync(path)
        }
    }

    getPath(file) {
        return config.get('filePath') + '\\' + file.conferenceId + '\\' + file.path
    }
}


module.exports = new FileService()
