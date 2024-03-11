const express = require('express')
const exphbs = require('express-handlebars')

const app = express() 

const hbs = exphbs.create({
  partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.get('/blog', (req, res) => {
 const posts = [ 
  {
    title: 'Aprender Node.js',
    category: 'Javascript',
    body: 'Este artigo te ajudara a aprender node.js',
    comments: 4
  },
  {
    title: 'Aprender next.js',
    category: 'Javascript',
    body: 'Este artigo te ajudara a aprender next.js',
    comments: 4
  },
  {
    title: 'Aprender python',
    category: 'Python',
    body: 'Este artigo te ajudara a aprender python',
    comments: 4
  }
 ]

 res.render('blog', {posts}) 
})

app.get('/post', (req, res) =>{
    
  const post = {
    title: 'Aprender Node.js',
    category: 'Javascript',
    body: 'Este artigo te ajudara a aprender node.js',
    comments: 4
  }

  res.render('blogpost', {post: post})
})


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