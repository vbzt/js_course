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

try{
  sequelize.authenticate()
  console.log('>> db ok')
}catch(e){
  console.log('>> db err: ' + e)
}



module.exports = sequelize        