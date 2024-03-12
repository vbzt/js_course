const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql')

const app = express()

app.use(express.urlencoded({
  extended: true
}))

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))


app.post('/books/insertbook', (req, res) => {

  const title = req.body.title
  const pagesqnt = req.body.pagesqnt

  const query = `INSERT INTO books (title, pagesqnt) VALUES ('${title}', '${pagesqnt}')`

  conn.query(query, (err) =>{
    if(err){
      console.log(err)
      return
    }

    res.redirect('/')
  })
  
})

app.get('/', (req, res) =>{
  res.render('home')
})

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'nodemysql'
})

conn.connect((err) => {
  if(err) {
    console.log(err); 
    return; 
  }

  console.log('>> DB on')

  app.listen(3002, () =>{
    console.log('>> Server on')
  })
})

