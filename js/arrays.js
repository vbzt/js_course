const nomes = ["a", "b", "c", "d"];
// O metodo splice funciona como Pop, shift, unshift e push
// nomes.splice(indice, quantidade, elemAdicionais)
nomes.splice(nomes.length, 0, "e"); // ---> Metodo Push, recomendado usar o push mas caso necessario usar splice
console.log(nomes);

nomes.splice(-1, 1); // ---> Metodo Pop, remove o ultimo indice do array (-1)
console.log(nomes);

nomes.splice(0, 1); // ---> Metodo Shift, remove o primeiro indice do array (0)
console.log(nomes);

nomes.splice(0, 0, "a"); // ---> Metodo Unshift, adiciona um elemento no primeiro indice do array (0)
console.log(nomes);

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //

const novosNomes = ["e", "f", "g", "h"];
// const todosNomes = nomes.concat(novosNomes) Meio arcaico mas usavel
const todosNomes = [...nomes, ...novosNomes]; // Meio de desconstrucao de array, ... rest passa a ser ... spread
console.log(todosNomes);

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// Filter --> Cria um array menor o igual o filtrado, dependendo dos parametros passados
const nums = [5, 50, 80, 1, 2, 3, 5, 8, 7, 11, 15, 22, 27];
const maiorQue10 = nums.filter((val) => val > 10); // --> Cria uma funcao de callback anonima, pode ser criada como funcao fora do metodo, mas não é recomendado
console.log(maiorQue10);

const pessoas = [
  { nome: "Luiz", idade: 62 },
  { nome: "Maria", idade: 23 },
  { nome: "Eduardo", idade: 55 },
  { nome: "Letícia", idade: 19 },
  { nome: "Rosana", idade: 32 },
  { nome: "Wallace", idade: 47 },
];

const nomesGrandes = pessoas.filter((val) => val.nome.length > 5);
console.log(nomesGrandes);

const pessoasVelhas = pessoas.filter((val) => val.idade >= 50);
console.log(pessoasVelhas);

const nomeTerminaComA = pessoas.filter((val) => val.nome.endsWith("a"));
console.log(nomeTerminaComA);

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// Map --> Cria um array com o mesmo tamanho do array original podendo mudar os seus valores

const numerosDobrados = nums.map((val) => val * 2);
console.log(numerosDobrados);

const nomesPessoas = pessoas.map((val) => val.nome);
console.log(nomesPessoas);

// const removeNomes = pessoas.map((val) => delete val.nome); --> Altera a array original
// console.log(pessoas);

const pessoasId = pessoas.map((val, id) => {
  val.id = id;
});

console.log(pessoas);

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// Reduce --> Reduz o array a um valor só ( Na maioria das vezes é para numeros )
// .reduce(function(acumulador, valor, indice, array){}, 0 --> Acumulador default)
const total = nums.reduce((sum, val) =>{
  sum += val
  console.log(val)
  return sum
}, 0)
console.log(total)

const numsPares = nums.reduce((sum,val) => {
  if(val % 2 === 0) sum.push(val) // --> Metodo filter, mais recomendado fazer com filter
  return sum
}, [])
console.log(numsPares)

const multiplicaReduce = nums.reduce((sum,val) => {
  sum.push(val * 2) // Metodo map, mais recomendado fazer com map
  return sum
}, [])
console.log(multiplicaReduce)

const somaPares = nums.reduce((sum, val) =>{
  if(val % 2 === 0) sum += val
  return sum
}, 0)
console.log(somaPares)


const maisVelha = pessoas.reduce((sum,val) =>{
  if(sum.idade > val.idade) return sum
  return val
})

console.log(maisVelha)

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// Filter + map + reduce
// Soma de todos os numeros pares vezes 2
const numeroPares = nums.filter(val => val % 2 === 0)
.map(val => val * 2)
.reduce((sum,val) => sum + val)

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= //
// ForEach 
const a1 = [1, 2, 3, 4, 5, 6 ,7 ,8, 9, 10]
// for(let val of a1) console.log(val)
// a1.forEach((val, i, array) => {
//   console.log(val)
// })
const sumA1 = 0
a1.forEach(val => sumA1 += val) // --> Simulacao de um reduce
