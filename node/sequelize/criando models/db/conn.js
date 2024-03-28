const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  host: 'localhost', 
  username: 'root',
  dialect: 'mysql',
  database: 'curso'
  // username: 'postgres',
  // password: '1qaz2wsx',
  // dialect: 'postgres'
  // dialectModule: 'pg'
})


async function auth(){
  try{
    await sequelize.authenticate()
    console.log('>> db ok') 
  }catch(err){
    console.log(`>> db error! ${err}`)
  }
}

auth()

module.exports = sequelize