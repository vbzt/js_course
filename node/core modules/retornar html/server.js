const http = require('http')
const port = 5000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<h1>Ola este e meu server com HTML</h1>')
})

server.listen(port, () =>{
  console.log(`Servidor aberto em localhost:${port}`)
})