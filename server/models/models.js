const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    displayName: {type: DataTypes.STRING, unique: false,},
    photo: {type: DataTypes.STRING, unique: false,},
    login: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
//    createdAt: {type: DataTypes.STRING, unique: false,},
})

const Content = sequelize.define('content', {
    id: {type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true},
    docx: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
})

User.hasMany(Content)
Content.belongsTo(User)

module.exports = {
    User,
    Content
}