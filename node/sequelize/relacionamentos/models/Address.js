const db = require('../db/conn')
const { DataTypes } = require('sequelize')

const User = require('./User')

const Address = db.define('Adress', {

  street: {
    type: DataTypes.STRING,
    required: true
  },
  number: {
    type: DataTypes.STRING,
    required: true
  },
  city: {
    type: DataTypes.STRING,
    required: true
  }

})

User.hasMany(Address)
Address.belongsTo(User)


module.exports = Address