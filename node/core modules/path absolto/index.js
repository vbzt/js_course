
const path = require('path')

console.log(path.resolve('text.txt'))

const midFolder = 'relatorios'
const fileName = 'text.txt'

const finalPath = path.join('/', 'arquivos', midFolder, fileName)

console.log(finalPath)