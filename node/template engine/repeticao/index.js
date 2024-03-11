const express = require('express')
const exphbs = require('express-handlebars')

const app = express() 

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) =>{
    
  const user = {name: 'Vitor'}

  const items  = ['Item A', 'Item B' , 'Item C']

  res.render('dashboard', {user, items})
})

app.get('/', (req, res) =>{
  
  const user = {
    name: 'Vitor',
    surname: 'Buzato',
    age: 16
  }

  const auth = true
  const approved = false
  

  res.render('home', {user, auth, approved})
})



app.listen(3001, () => {
  console.log('>> Server on')
})