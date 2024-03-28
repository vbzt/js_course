const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')

const app = express()

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))


app.get('/users/create', (req, res) => { 
  res.render('adduser')
})

app.post('/users/create', async (req, res) => { 
  
  const name = req.body.name 
  const occupation = req.body.occupation 
  let newsletter = req.body.newsletter === "on" ? true : false
  

  await User.create({name, occupation, newsletter})
  console.log('>> user criado com nome de ' + name)

  res.redirect('/')
})


app.get('/users/:id', async (req, res) => { 
  const id = req.params.id
  const user = await User.findOne({raw: true, where: {id: id}})

  res.render('user', { user })
})


app.post('/users/delete/:id', async (req, res) => {

  const id = req.params.id
  await User.destroy({where: {id: id}})

  res.redirect('/')
})

app.get('/users/edit/:id', async (req, res) => {

  const id = req.params.id
  const user = await User.findOne({raw: true, where: {id: id}})

  res.render('useredit', {user})
})

app.post('/users/update', async (req, res) => { 

  const id = req.body.id
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter === "on" ? true : false

  const newUser = { id, name, occupation, newsletter }

  await User.update(newUser, {where: {id:id}})

  res.redirect('/')
})

app.get('/', async (req, res) =>{
  const user = await User.findAll({raw: true})
  res.render('home', {users: user}) 
})

conn.sync()
.then(
  app.listen(3002, () =>{
  console.log('>> db ok') 
  console.log('>> server on')
})).catch((e) => console.log('err during sync'))