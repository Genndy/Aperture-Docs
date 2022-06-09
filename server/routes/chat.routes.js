const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const fileController = require('../controllers/chatController')

router.post('', authMiddleware, fileController.createDir) // 
// Send messages
// Read messages
// 

module.exports = router