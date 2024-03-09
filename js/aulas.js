try {
  console.log(naoExisto);
} catch (err) {
  console.log("naoExisto não existe");
  console.log(err);
}

function soma(x, y) {
  if (typeof x !== "number" || typeof y !== "number") {
    throw new Error("x e y precisam ser numeros");
  }
  return x + y;
}

try {
  console.log(soma(2, 2));
  console.log(soma("2", 2));
} catch (err) {
  console.log(err);
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- //

try {
  console.log("Abri um arquivo");
  console.log("Editei o arquivo e gerou erro");
  console.log("Fechei o arquivo");
} catch (err) {
  console.log("Tratando o erro");
} finally {
  console.log("Eu sempre serei executado");
}

function retornaHora(data) {
  if (data && !(data instanceof Date)) {
    throw new TypeError(
      "Instancia recebia não esta em formato de horas (00:00:00)"
    );
  }
  if (!data) data = new Date();
  return data.toLocaleTimeString("pt-BR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

try {
  const data = new Date();
  const hora = retornaHora(data);
  console.log(hora);
} catch (e) {
  console.log(e);
} finally {
  console.log("tenha um bom dia");
}
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- //

const timer123 = setInterval(() => console.log(retornaHora()), 1000);
setTimeout(() => clearInterval(timer), 5000);

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- //

function conta(operador, acumulador, ...numeros) {
  for (let numero of numeros) {
    if (operador === "+") acumulador += numero;
    if (operador === "-") acumulador -= numero;
    if (operador === "/") acumulador /= numero;
    if (operador === "*") acumulador *= numero;
  }
  return acumulador;
}

console.log(conta("-", 0, 20, 30, 40, 50));

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- //

function criaPessoa(nome, sobrenome, altura, peso) {
  return {
    nome,
    sobrenome,

    // Getter
    get nomeCompleto() {
      return `${this.nome}` + " " + `${this.sobrenome}`;
    },

    // Setter
    set nomeCompleto(valor) {
      valor = valor.split(" ");
      this.nome = valor.shift();
      this.sobrenome = valor.join(" ");
    },

    fala(assunto = "nada") {
      return `${this.nomeCompleto} está falando sobre ${assunto}, e ele tem ${this.peso}KG`;
    },

    altura,
    peso,
    // Getter
    get imc() {
      const alturaImc = this.altura ** 2;
      const imc = this.peso / alturaImc;
      return imc.toFixed(2);
    },
  };
}

const p1 = criaPessoa("a", "b", 1.75, 60);
p1.nomeCompleto = "Vitor de Castro Buzato";
console.log(p1.fala("js"));
console.log(p1.imc);

const p2 = criaPessoa("c", "d", 1.9, 90);
console.log(p2.fala("c#"));
console.log(p2.imc);

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- //

function recursiva(val) {
  if (val >= 10) return;
  val++;
  console.log(val);
  recursiva(val); // --> Se chama ate val bater o if, tipo um do while mas bem mais clean
}

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- //

function* geradora() {
  yield 1;
  yield 2;
  yield 3;
}

const g1 = geradora();
console.log(g1.next().value);

function* geradora2() {
  let i = 0;
  while (i < 30) {
    yield i;
    i++;
  }
}

const g2 = geradora2();
console.log(g2.next().value);

function* geradora3() {
  yield* geradora();
  yield 4;
  yield 5;
  yield 6;
}

const g3 = geradora3();

for (let valor of g3) {
  console.log(valor);
}

function* geradora4() {
  yield function () {
    console.log("Vim do yield 1");
  };
  yield function () {
    console.log("Vim do yield 2");
  };
}

const g4 = geradora4();
const g4func1 = g4.next().value;
const g4func2 = g4.next().value;

g4func1();
g4func2();
