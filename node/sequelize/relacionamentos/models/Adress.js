const db = require('../db/conn')
const { DataTypes } = require('sequelize')

const User = require('./User')

const Adress = db.define('Adress', {

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


Adress.belongsTo(User)


module.exports = Adress