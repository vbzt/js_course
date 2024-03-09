// then e catch
// São assincronos e um é executado após o outro acabar, caso algum reporte erro, a cadeia inteira é parada

function rand(min = 0, max = 3){
  min *= 1000
  max *= 1000
  return Math.floor(Math.random() * (max - min) + min)
}

function espera(msg, tempo){
  return new Promise((resolve, reject) =>{
    setTimeout(() =>{
      if(typeof msg !== 'string'){
         reject('Cai no erro da promisse') 
         return
      }
      resolve(msg.toUpperCase() + ' - Passei na promisse')
    },tempo)
  })
}

espera('msg', rand(1, 3))
.then(resposta => {
  console.log(resposta)
  return espera(222, rand(1, 3))
}).then(resposta =>{
  console.log(resposta)
  return espera('msg3', rand(1, 3))
}).then(resposta =>{
  console.log(resposta)
}).catch(e => console.log('Erro encontrado! Erro: ' + e))

// Promisse .all, .race, .resolve, .reject
const promisses = [
  'primeiro valor', 
  espera('Promisse1', rand(1, 3)),
  espera('Promisse2', rand(1, 3)),
]

Promise.all(promisses) // resolve todas as promessas ao mesmo tempo
.then((val) => console.log(val ))
.catch((e) => console.log(e))


const race = [ 
  espera('Promisse1 Race', rand(1, 3)),
  espera('Promisse2 Race', rand(1, 3)),
  espera('Promisse3 Race', rand(1, 3)),
]
Promise.race(race) // Resolve as promessas ao mesmo tempo e a que chegar primeiro ele retorna (como numa corrida mesmo)
.then((val) => console.log(val))
.catch((e) => console.log(e))

function baixaPagina(){
  const emCache = true
  if(emCache){
    return Promise.resolve('Pagina em cache')
  }else{
    return espera('Baixei a pagina', 3000)
  }
}

baixaPagina()
.then(dadosPagina => console.log(dadosPagina))
.catch(e => console.log(e))

function fechaPagina(){
  const emCache = true
  if(emCache){
    return Promise.reject('Pagina esta em cache')
  }else{
    return espera('Fechei a pagina', 3000)
  }
}

fechaPagina()
.then(dadosPagina => console.log(dadosPagina))
.catch(e => console.log('Erro!' + e))

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= // 
// Async e await 
async function executa(){ 
  try{
    const fase1 = await espera('Fase 1', rand())
    console.log(fase1)

    const fase2 = await espera('Fase 2', rand())
    console.log(fase2)

    const fase3 = await espera('Fase 3', rand())
    console.log(fase3)

    console.log('Terminamos na fase: ', fase3)
  }catch(e){
    console.log(e)
  }
  
}

executa()

