require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const sequelize = require('./db')
const models = require('./models/Models')
const cors = require('cors')

const config = require("config")
const fileUpload = require("express-fileupload")
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes")
const trueConfRouter = require("./routes/trueConf.routes")
const app = express()
const PORT = process.env.PORT || 5001
const corsMiddleware = require('./middleware/cors.middleware')

app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json())
app.use(express.static('static'))
app.use("/api/auth", authRouter)
app.use("/api/files", fileRouter)
app.use("/api/trueConf", trueConfRouter)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        await mongoose.connect(config.get("dbUrl"), {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
