function ValidateCpf(cpf){
  this.cpf = cpf
}

ValidateCpf.prototype.cleanArray = function(){
  let cleanCpf = this.cpf.replace(/\D+/g, '');
  let cleanCpfArray = Array.from(cleanCpf)
  if (cleanCpfArray.length !== 11) throw new TypeError('Cpf invalido')
  return cleanCpfArray
}

ValidateCpf.prototype.first = function(){
  let cleanCpfArray = this.cleanArray()
  cleanCpfArray.splice(-2)
  let i = 10

  const sum = cleanCpfArray.reduce((sum, digit) => {
    sum += Number(digit) * i;
    i--;
    return sum;
  }, 0);
  let result = 11 - (sum % 11);
  result = (result > 9) ? 0 : result
  cleanCpfArray.push(String(result))
  return result;
}

ValidateCpf.prototype.second = function(){
  let cleanCpfArray = this.cleanArray()
  cleanCpfArray.splice(-1)
  let i = 11

  const sum = cleanCpfArray.reduce((sum, digit) => {
    sum += Number(digit) * i;
    i--;
    return sum;
  }, 0);
  let result = 11 - (sum % 11);
  result = (result > 9) ? 0 : result
  cleanCpfArray.push(String(result))
  return result;
}

ValidateCpf.prototype.validate = function(){
  const first = this.first()
  const second = this.second()
  const cpfArray = this.cleanArray()

  if(cpfArray[cpfArray.length - 2] == first && cpfArray[cpfArray.length - 1] == second){
    return 'Cpf valido'
  }
  return 'Cpf inválido'
}

const cpf = new ValidateCpf("705.484.450-52")
console.log(cpf.first())