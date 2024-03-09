// const pessoa = {
//   nome: 'a',
//   sobrenome: 'b'
// }
// console.log(pessoa.nome) // console.log(pessoa['nome']) --> Bom para usar quando nao se sabe o valor do elemento
// console.log(pessoa.sobrenome)

function CriaPessoa(nome, sobrenome){
    this.nome = nome;
    this.sobrenome = sobrenome;
}

const p1 = new CriaPessoa('Luiz', 'Miranda')
Object.freeze(p1) // Não é possivel mais alterar o objeto
console.log(p1)
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= // 
// defineProperty - defineProperties / Getters e setters
function Produto(nome, preco, estoque){
  this.nome = nome
  this.preco = preco
  //this.estoque = estoque
  // Sem usar o this no estoque, ele fica privado
  let estoquePrivado = estoque
  Object.defineProperty(this, 'estoque', {
    enumerable: true, // Mostra ou nao a chave
    // value: estoque,
    // writable: false, // Valor pode ou nao ser alterado 
    configurable: false, // Pode ou não reconfigurar / editar / apagar a chave
    get: function(){ // Retorna o valor da variavel
      return estoquePrivado
    },
    set: function(val){
      if(typeof val !== 'number'){ 
        throw new TypeError('Msg de erro')
      }
      estoquePrivado = val
    }
  })
}

const prod1 = new Produto('Camiseta', 30, 10)
console.log(Object.keys(prod1))
for(let chave in prod1){
  console.log(chave)
}
prod1.estoque = 123123
console.log(prod1.estoque)

function criarProduto(nome){
  return{
    get nome(){
      return nome
    },
    set nome(val){
      nome = val
    }
  }
}

const prod2 = criarProduto('Camiseta')
prod2.nome = 'Camisa'
console.log(prod2.nome)

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= // 

const produtoBase = {nome: 'Produto', preco: 10}
console.log(Object.getOwnPropertyDescriptor(produtoBase, 'nome'))
Object.defineProperty(produtoBase, 'nome',{
  writable: false,
  configurable: false,
  value: 'Nome do produto'
})

console.log(Object.values(produtoBase)) // Retorna os valores em uma array ['Nome do Produto', 10]
console.log(Object.keys(produtoBase)) // Retorna as keys em uma array ['nome', 'preco']
console.log(Object.entries(produtoBase)) // Retorna as tantos as keys tanto os valores [ [ 'nome', 'Nome do produto' ], [ 'preco', 10 ] ]
 

const caneca = Object.assign({}, produtoBase) // Spread ainda é melhor, mas é bom aprender essa maneira tbm
caneca.nome = 'Caneca'
caneca.material = 'Porcelana' // Posso tambem adicionar mais um elemento ao objeto
for(let [key, val] of Object.entries(caneca)){
  console.log(key, val) // Key -- Nome, Preco e material || Val -- Caneca, 10 e porcelana
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= // 
// Properties 
function Pessoa(nome, sobrenome){
  this.nome = nome,
  this.sobrenome = sobrenome
  // this.nomeCompleto = () => this.nome + ' ' + this.sobrenome
}

// Instancias
const pessoa1 = new Pessoa('Vitor', 'Buzato')
console.log(pessoa1)

// Prototypes
Pessoa.prototype.nomeCompleto = function(){ // Melhora performance, já que o prototype cria o metodo para o pai Pessoa, não para cada filho
  return this.nome + ' ' + this.sobrenome}
console.log(pessoa1.nomeCompleto())
// Pessoa.prototype = { nomeCompleto: [Function (anonymous)] }

// Manipulando Prototypes
const objA = {
  chaveA: 'A'
  // __proto__: Object.Prototype
}

const objB = {
  chaveB: 'B'
  // __proto__: objA
}

Object.setPrototypeOf(objB, objA)
// __proto__ de objB agora é chaveA: 'a'
console.log(objB.chaveA)

const objC = {
  chaveC: 'C'
}

Object.setPrototypeOf(objC, objB)
console.log(objC.chaveA)

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //  

Produto.prototype.desconto = function(percent){
  this.preco = this.preco - (this.preco * (percent / 100))
}

Produto.prototype.aumento = function(percent){
  this.preco = this.preco - (this.preco * (percent / 100))
}

const camisa = new Produto('Camiseta', 50)
camisa.desconto(10)
console.log(camisa.preco)

const caneca2 = {
  nome: 'Caneca',
  preco: 15
}
Object.setPrototypeOf(caneca2, Produto.prototype)

const shorts = Object.create(Produto.prototype, {
  tamanho: {
    writable: true,
    configurable: true,
    enumerable: true,
    value: 'M'
  },
  preco: {
    writable: true,
    configurable: true,
    enumerable: true,
    value: 50
  }
})
shorts.nome = 'Shorts'
console.log(shorts)


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //  
// Heranças

function CriaProduto(nome, preco){
  this.nome = nome,
  this.preco = preco
}

Produto.prototype.aumento = function(qnt){
  this.preco += qnt
}

Produto.prototype.desconto = function(qnt){
  this.preco -= qnt
}

function Camiseta(nome, preco, cor){
  Produto.call(this, nome, preco)
  this.cor = cor
}

Camiseta.prototype = Object.create(Produto.prototype)
Camiseta.prototype.constructor = Camiseta


function Caneca(nome, preco, material, estoque){
  CriaProduto.call(this, nome, preco)
  this.material = material
 
  Object.defineProperty(this, 'estoque', {
    enumerable: true,
    configurable: false,
    get: function(){
      return estoque
    },
    set: function(val){
      if (typeof val !== 'number') {
        throw new TypeError('O valor do estoque deve ser um número.')
      }
      estoque = val
    }
    
  })
}


Caneca.prototype = Object.create(Produto.prototype)
Caneca.prototype.constructor = Caneca

const caneca3 = new Caneca('Caneca', 13, 'Porcelana', 500)
const produto = new CriaProduto('Generico', 11)
const camiseta = new Camiseta('Regata', 10, 'Preta')
console.log(caneca3)
console.log(produto)
console.log(camiseta)

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //  
// Polimorfismo
//Superclass
function Conta(agencia, conta, saldo){
  this.agencia = agencia
  this.conta = conta
  this.saldo = saldo
}

Conta.prototype.sacar = function(val) { // Mesmo estando nos Objetos Conta e ContaCorrente ele se molda a depender da conta
  if(this.saldo >= val){
    this.saldo -= val
    this.verSaldo()
    return
  }
  return 'Saldo Insuficiente'
}
Conta.prototype.depositar = function(val) {
  this.saldo += val
  this.verSaldo()
}
Conta.prototype.verSaldo = function() {
  console.log(`Banco - ${this.agencia} \nSaldo - R$${this.saldo.toFixed(2)}`)
}

const conta1 = new Conta(11, 22, 100)
conta1.sacar(20)
conta1.depositar(40)

function ContaCorrente(agencia, conta, saldo, limite){ // Unico diferencial é que esta conta pode negativar, por isso o limite
  Conta.call(this, agencia, conta, saldo) // --> Chama todos os metodos da factory Conta com o this
  this.limite = limite
}

ContaCorrente.prototype = Object.create(Conta.prototype)
ContaCorrente.prototype.constructor = ContaCorrente

ContaCorrente.prototype.sacar = function(val) { // Mesmo estando nas Factories Conta e ContaCorrente ele se molda a depender da conta
  if(val > (this.saldo + this.limite)){
    return 'Saldo Insuficiente'
  }
  this.saldo -= val
  return this.verSaldo()
}

const contaC = new ContaCorrente(33, 22, 100, 200)
contaC.sacar(300)

function ContaPoupanca(agencia, conta, saldo){
  Conta.call(this, agencia, conta, saldo)
}

ContaPoupanca.prototype = Object.create(Conta.prototype)
ContaPoupanca.prototype.constructor = ContaPoupanca

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //  
// Factory Functions + Prototypes
function criaNovaPessoa(nome, sobrenome) {
   // Criar metodos dentro da factory é ruim tanto pro client tanto pro server side
  // Como esse return {falar(): console.log('Oi, eu sou o ${this.nome}!)} --> Muito melhor adicionar dentro do prototype
  const pessoaPrototype = {
    falar(){console.log(this.nome + ' está falando') },// As tres funcoes serao diretamente ligadas ao prototype quando a pessoa for criada  
    beber(){console.log(this.nome + ' está bebendo') },// As tres funcoes serao diretamente ligadas ao prototype quando a pessoa for criada  
    comer(){console.log(this.nome + ' está comendo')} // As tres funcoes serao diretamente ligadas ao prototype quando a pessoa for criada 
  }
  return Object.create(pessoaPrototype, {
    nome: {value: nome}, // Posso adicionar getters e setters ao utilizar esse metodo para criar o objeto
    sobrenome: {value: sobrenome}
  }) // Esse return vai retornar tanto o prototype quanto as chaves nome e sobrenome  
}

const luiz = new criaNovaPessoa('Luiz' , 'Silva')
luiz.falar()

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //  
// .map() em Objetos
const pessoas = [
  {id: 3, nome: 'A'},
  {id: 2, nome: 'B'},
  {id: 1, nome: 'C'},
]

// const novasPessoas = {}
// for(const pessoa of pessoas){
//   const {id} = pessoa
//   novasPessoas[id] = {...pessoa} // Daria errado pois ao usar numeros como chave ele usara ordem crescente, entao o id 3 iria para a ultima posicao
// }
const novasPessoas = new Map()
for(const pessoa of pessoas){
  const {id} = pessoa
  novasPessoas.set(id, {...pessoa})

}

for(const pessoa of novasPessoas.values()){
  console.log(pessoa)
}