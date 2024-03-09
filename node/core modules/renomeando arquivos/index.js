const fs = require('fs')

fs.rename('arquivo.txt', 'novoarquivo.txt', function(err){
  console.log(err)
  return
})