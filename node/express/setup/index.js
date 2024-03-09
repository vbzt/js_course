const express = require('express')
const app = express()
const port = 3000 // variavel ambiente

app.get('/', (req, res) => {

  res.send('Ola mundo')

})

app.listen(port, () =>{
  console.log(`App rodando em localhost:${port}`)
})