// Modo diferente de criar uma funcao construtora
// Preferivel usar classe

class Pessoa{
  constructor(nome, sobrenome){ // Recebe os parametros da classe
    this.nome = nome;
    this.sobrenome = sobrenome
  }

  falar(){console.log(`${this.nome} esta comendo`)} // Automaticamente linkado ao __proto__ (---> MUITO MAIS FACIL!!!!! <---)
}

const p1 = new Pessoa('A', 'B')
console.log(p1)

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //  
// Getters e setters
const _velocidade = Symbol('velocidade') // Ao usar Symbol, toda vez que alguem chamar a chave velocidade, ele criara um id aleatorio que nunca sera igual a outro, deixando mais dificil de acessar velocidade fora da classe
class Carro{
  constructor(nome){
    this.nome = nome;
    this[_velocidade] = 0
    this.limite = 100
  }

  get velocidade(){
    return this[_velocidade]
  }

  set velocidade(val){
    if(val > this.limite || val < 0 || typeof(val) !== 'number') return
    this[_velocidade] = val
  }

  acelerar(){ 
    if(this[_velocidade] >= this.limite) return
    this[_velocidade] ++
  }
  desacelerar(){ 
    if(this[_velocidade] <= 0) return
    this[_velocidade] --
  }
}

const fusca = new Carro('fusca')

// for(let i = 0; i <= 200; i++){
//   fusca.acelerar()
// }

fusca.velocidade = 101 // Se estiver dentro dos paramentros do setter velocidade(),  ela sera alterada, caso nao estiver ela permanecera a velocidade anterior
console.log(fusca.velocidade)
console.log(fusca)

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //  
// Herancas 

class Disposito{
  constructor(nome){
    this.nome = nome
    this.ligado = false
  }

  ligar(){
   if(this.ligado){
    console.log(`${this.nome} já esta ligado!`)
    return
   }
   this.ligado = true
   console.log(`${this.nome} foi ligado!`)
  }

  desligar(){
    if(!this.ligado){
     console.log(`${this.nome} já esta desligado!`)
     return
    }
    this.ligado = false
    console.log(`${this.nome} foi desligado!`)
   }
  
}

const dis1 = new Disposito('Smartphone')
dis1.ligar()
dis1.desligar()

class Smartphone extends Disposito{
  // Copia todos os dados da classe Pai
  constructor(nome, cor, modelo){
    super(nome), // Chama o construtor da classe pai
    this.cor = cor,
    this.modelo = modelo
  }
}

const iph = new Smartphone('Iphone', 'Preto', '11 pro')
iph.ligar()
iph.desligar()
console.log(iph)

class Tablet extends Smartphone{
  constructor(nome, cor, modelo, polegadas){
    super(nome,cor,modelo)
    this.polegadas = polegadas
  }
}

const ipad = new Tablet('iPad', 'Azul', '5s', 7.8)

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //  
// Instancias e estaticos

class ControleRemoto{
  constructor(tv){
    this.tv = tv
    this.volume = 0
  }

  aumentarVol(){
    if(this.volume >= 100){
      console.log('Volume maximo atingido')
      return
    }
    this.volume++
  }
  // Metodo de instancia --> Ao ser executado somente a instancia selecionada sera afetada
  diminuirVol(){
    if(this.volume <= 0){
      'Volume minimo atingido'
      return
    }
    this.volume--
  }

  // Metodo estatico (ao ser executado, todas as intancias serao afetadas)
  static trocaPilha(){
    console.log('Pilha trocada')
  }


}

const cont1 = new ControleRemoto('LG')
for(let i = 0; i <= 100; i++){
  cont1.aumentarVol()
}
console.log(cont1)

const cont2 = new ControleRemoto('Sky')
ControleRemoto.trocaPilha()