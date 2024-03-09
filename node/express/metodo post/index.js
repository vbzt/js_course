const express = require('express')
const app = express()
const port = 3000 // variavel ambiente

const path = require('path')

// Ler o body
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

const basePath = path.join(__dirname, 'templates') 

app.get('/user/add', (req, res) => {
  res.sendFile(`${basePath}/userform.html`)
})

app.post('/user/save', (req, res) => {
  console.log(req.body)

  const name = req.body.name
  const age = req.body.age

  console.log(`O nome de usuario é ${name}, e ele tem ${age} anos`)

  res.sendFile(`${basePath}/userform.html`)
  

})

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

