const { Sequelize } = require('sequelize');
const pg = require('pg')

const sequelize = new Sequelize({
  host: 'localhost',
  port: 5432, 
  database: 'curso',
  username: 'postgres',
  password: '1qaz2wsx', 
  dialect: 'postgres',
  dialectModule: pg

})

async function testConn(){
  try {
    await sequelize.authenticate();
    console.log(">> db ok");
  } catch (err) {
    console.log(`>> db err: ${err}`);
  }
};

testConn()

module.exports = sequelize;