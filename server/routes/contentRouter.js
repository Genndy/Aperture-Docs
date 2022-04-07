const Router = require('express')
const contentController = require('../controllers/contentController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.post('/create', contentController.create)
router.get('/', contentController.getAll)
router.get('/:id', contentController.getOne)

module.exports = router