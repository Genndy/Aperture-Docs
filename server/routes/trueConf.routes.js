const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const trueConfController = require('../controllers/trueConfController')

router.get('/auth', authMiddleware, trueConfController.auth)

// router.post('/createUser', authMiddleware, trueConfController.register) // Создание юзера
// router.post('/removeUser', authMiddleware, trueConfController.removeUser) // Удаление юзера

// router.post('/createConference', authMiddleware, trueConfController.createConference) // Создание конференции
// router.get('/removeConference', authMiddleware, trueConfController.removeConference) // Удаление конференции/остановка
// router.get('/conference', authMiddleware, trueConfController.conference) // Получение доступа к конференции


module.exports = router
