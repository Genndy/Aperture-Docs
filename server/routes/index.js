const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const contentRouter = require('./contentRouter')

router.use('/user', userRouter)
router.use('/content', contentRouter)

module.exports = router