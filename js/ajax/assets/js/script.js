// Este modo é antigo, devido a criação de promisses, há um jeito bem mais facil de se fazer

//const request = obj => {
//  const xhr = new XMLHttpRequest()
//  xhr.open(obj.method, obj.url, true);
//  xhr.send()
//
//  xhr.addEventListener('load', () => {
//    if(xhr.status >= 200 && xhr.status < 300){
//      obj.success(xhr.responseText)
//    }else{
//      obj.error({
//        code: xhr.status,
//        msg: xhr.statusText
//      })
//    }
//  })
//}
//
//document.addEventListener('click' , e => {
//  const el = e.target
//  const tag = el.tagName.toLowerCase()
//  if(tag === 'a'){
//    e.preventDefault()
//    carregaPagina(el)
//  }
//})
//
//function carregaPagina(el){
//  const ref = el.getAttribute('href')
//  const requestConfig = {
//    method: 'GET',
//    url: ref,
//    success(resp){
//      carregaResultado(resp)
//    },
//    error(errorText){
//      console.log(errorText)
//    }
//  }
//  request(requestConfig)
//}
//
//function carregaResultado(ref){
//  const resultado = document.querySelector('.resultado')
//  resultado.innerHTML = ref
//}

// Metodo utilizando promisses e fetch API

document.addEventListener('click' , e => {
  const el = e.target
  const tag = el.tagName.toLowerCase()
  if(tag === 'a'){
    e.preventDefault()
    carregaPagina(el)
  }
})

async function carregaPagina(el){
  try{
    const ref = el.getAttribute('href')
  
    const resp = await fetch(ref)
    if(resp.status !== 200) throw new Error('ERRO ' + resp.status)
  
    const html = await resp.text()
    carregaResultado(html)
  }catch(e){
    console.error(e)
  }
  
}

function carregaResultado(ref){
  const resultado = document.querySelector('.resultado')
  resultado.innerHTML = ref
}

