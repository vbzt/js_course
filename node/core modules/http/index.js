const http = require('http')
const port = 4000

const server = http.createServer((req, res) => {
  res.write('Oi http')
  res.end()
})

server.listen(port, () =>{
  console.log(`Servidor aberto em https://localhost:${port}`)
})