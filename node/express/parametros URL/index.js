const express = require('express')
const app = express()
const port = 3000 // variavel ambiente

const path = require('path')

const basePath = path.join(__dirname, 'templates') 



app.get('/user/:id', (req, res) => {
  const id = req.params.id 
  console.log('Estamos usando pelo usuario', id)

  res.sendFile(`${basePath}/user.html`)

})


app.get('/', (req, res) => {

  res.sendFile(`${basePath}/index.html`)

})

app.listen(port, () =>{
  console.log(`App rodando em localhost:${port}`)
})