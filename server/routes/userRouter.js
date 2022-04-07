const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController.js')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)


router.get('/auth', authMiddleware, userController.check)

// router.get('/auth', authMiddleware, userController.check)


// router.get('/test', authMiddleware, userController.test)
module.exports = router