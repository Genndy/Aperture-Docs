const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const trueConfController = require('../controllers/trueConfController')

router.get('/auth', authMiddleware, trueConfController.auth)

router.post('/createConference', authMiddleware, trueConfController.createConference) // Создание конференции
router.post('/connectToConference', authMiddleware, trueConfController.connectToConference) // Получение доступа к конференции
router.post('/removeConference', authMiddleware, trueConfController.removeConference) // Удаление конференции/остановка

module.exports = router