const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

const User = require('./models/User')
const Address = require('./models/Address')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

app.get('/', async (req, res) => {
  const users = await User.findAll({ raw: true })
  res.render('home', { users })
})

app.get('/users/create', (req, res) => {
  res.render('adduser')
})

app.post('/users/create', async (req, res) => {
  const { name, occupation, newsletter } = req.body
  const newUser = { name, occupation, newsletter: newsletter === 'on' }
  await User.create(newUser)
  res.redirect('/')
})

app.get('/users/:id', async (req, res) => {
  const { id } = req.params
  const user = await User.findOne({ raw: true, where: { id } })
  res.render('user', { user })
})

app.post('/users/delete/:id', async (req, res) => {
  const { id } = req.params
  await User.destroy({ where: { id } })
  res.redirect('/')
})

app.get('/users/edit/:id', async (req, res) => {
  const { id } = req.params
  const user = await User.findOne({ include: Address, where: { id: id }})
  try{ 
    const userData = user.get({ plain: true })
    res.render('useredit', { user: userData})
  }catch(e){
    console.log('>> err ' +  e)
    res.redirect('/')
  }
})

app.post('/users/update', async (req, res) => {
  const { id, name, occupation, newsletter } = req.body
  const updatedUser = { id, name, occupation, newsletter: newsletter === 'on' }
  await User.update(updatedUser, { where: { id } })
  res.redirect('/')
})

app.post('/address/create', async (req, res) => {
  const { UserId, street, number, city } = req.body
  await Address.create({ UserId, street, number, city })
  res.redirect(`/users/edit/${UserId}`)
})

app.post('/address/delete', async (req, res) => { 
  const UserId = req.body.UserId
  const id = req.body.id
  
  console.log(UserId)
  await Address.destroy({ where: {id: id} })
  res.redirect(`/users/edit/${UserId}`)
})

conn.sync()
  .then(() => {
    app.listen(3002, () => {
      console.log('>> db ok')
      console.log('>> server on')
    })
  })
  .catch((err) => console.log(err))