const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
 //   id: {type: DataTypes.STRING, primaryKey: true},
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    diskSpace: {type: DataTypes.BIGINT, defaultValue: 1024**3*10},
    usedSpace: {type: DataTypes.BIGINT, defaultValue: 0},
    avatar: {type: DataTypes.STRING},
})

const File = sequelize.define('file', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    type: {type: DataTypes.STRING, allowNull: false},
    accessLink: {type: DataTypes.STRING},
    size: {type: DataTypes.BIGINT, defaultValue: 0},
    path: {type: DataTypes.STRING, defaultValue: ''},
    date: {type: DataTypes.DATE, defaultValue: Date.now()},
}) 

const Conference = sequelize.define('conference', {
    id: {type: DataTypes.INTEGER, primaryKey: true,},
    password: {type: DataTypes.STRING, allowNull: false},
})

const TrueConfToken = sequelize.define('true_conf_token', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    token: {type: DataTypes.STRING, allowNull: false, defaultValue: 'null'},
    expiresIn: {type: DataTypes.DATE, allowNull: false, defaultValue: Date.now()}
})

User.hasMany(File)
File.belongsTo(File)

File.hasMany(File, {
    foreignKey: {
      name: 'childs'
    }})
File.belongsTo(File, {
    foreignKey: {
      name: 'parent'
    }})

User.hasOne(Conference)
Conference.belongsTo(User)

module.exports = {
    User,
    File,
    Conference,
    TrueConfToken
}