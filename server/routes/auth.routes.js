const Router = require("express");
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const {File, User} = require('../models/models')
const fileService = require('../services/fileService')
const trueConfAccountManager = require('../services/trueconf/trueConfAccountManager')

router.post('/registration',
    [
        check('email', "Uncorrect email").isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({min:3, max:12})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: "Uncorrect request", errors})
        }
        const {email, password, name, surname} = req.body
        const candidate = await User.findOne({where: {email}})
        if(candidate) {
            return res.status(400).json({message: `User with email ${candidate.email} already exist`})
        }
        console.log('creating user: ' + '\n' +
                    '  email: ' + email + '\n' +
                    '  password: ' + password + '\n' +
                    '  name: ' + name + '\n' +
                    '  surname: ' + surname + '\n')
        const hashPassword = await bcrypt.hash(password, 8)
        const user = await User.create({email, name, surname, password: hashPassword})
        // await fileService.createDir(new File({userId : user.id, name: ''}))

        await trueConfAccountManager.registration(user.id, user.name, password, user.email)

        res.json({message: "User was created"})
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post('/login',
    async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})
            console.log('logging in, email:  ' + email)
            if (!user) {
                return res.status(404).json({message: "User not found"})
            }
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({message: "Invalid password"})
            }
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar,
                    currentConference: user.conference
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })


module.exports = router
