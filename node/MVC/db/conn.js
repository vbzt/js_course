const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  host: 'localhost', 
  username: 'root',
  dialect: 'mysql',
  database: 'cursoMvc'
  // username: 'postgres',
  // password: '1qaz2wsx',
  // dialect: 'postgres'
  // dialectModule: 'pg'
})




module.exports = sequelize