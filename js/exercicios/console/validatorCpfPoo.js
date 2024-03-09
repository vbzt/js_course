class ValidateCpf{
  constructor(cpf){
    this.cpf = cpf
  }

  validateCharacters(){
    if(!this.cpf || typeof(this.cpf) !== 'string'){
      console.log('Cpf Invalido!')
      return false
    }
    return true
  }

  cleanCpfArray(){
    let cleanCpf = this.cpf.replace(/\D+/g, '');
    let cleanCpfArray = Array.from(cleanCpf)
    cleanCpfArray = cleanCpfArray.map((val) => Number(val))
    
    if(cleanCpfArray.length !== 11){
      console.log('Cpf invalido')
      return
    }
    return cleanCpfArray
  }

  firstDigit(){
    let cpfArray = this.cleanCpfArray()
    cpfArray.splice(-2)
    let i = 10
    let total = cpfArray.reduce((sum, val) =>{

      sum += val * i
      i--

      return sum
    },0)
    let result = 11 - (total % 11)
    result = result > 9 ? 0 : result
    return result
  }

  secondDigit(){
    let cpfArray = this.cleanCpfArray()
    cpfArray.splice(-1)
    let i = 11
    let total = cpfArray.reduce((sum, val) =>{

      sum += val * i
      i--

      return sum
    },0)
    let result = 11 - (total % 11)
    result = result > 9 ? 0 : result
    return result
  }

  validateCpf(){
    let originalCpfArray = this.cleanCpfArray().splice(-2)
    let validateCpfArray = [this.firstDigit(), this.secondDigit()]
    if(originalCpfArray.join('') !== validateCpfArray.join('')) return 'Cpf Invalido!'
    return 'Cpf valido!'
  }
}

const cpf = new ValidateCpf("070.987.720-03")
console.log(cpf.validateCpf())