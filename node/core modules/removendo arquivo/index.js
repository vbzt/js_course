const fs = require('fs')

fs.unlink('arquivo.txt', function(err){
  console.log(err)
  return
})