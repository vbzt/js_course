const fs = require('fs')

if(!fs.existsSync('./pasta')){
  console.log('Nao existe')
  fs.mkdirSync('pasta')
}else{
  console.log('Existe')
}

