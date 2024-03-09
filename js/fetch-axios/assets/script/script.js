const el = {
  nome: document.querySelector("#nome"),
  email: document.querySelector("#email"),
  salario: document.querySelector("#salario"),
  estado: document.querySelector("#estado"),
  empresa: document.querySelector("#empresa"),
  idade: document.querySelector("#idade"),
  sexo: document.querySelector("#sexo"),
  cpf: document.querySelector("#cpf"),
};

async function fetchData() {
  const result = document.querySelector(".result");
  result.style.display = "flex";

  const search = document.querySelector("#search").value.toLowerCase();

  const error = document.querySelector("#erro");
  error.innerHTML = "";

  try {
    const resp = await fetch("pessoas.json");
    if (!resp.ok) throw new Error("Fetch error");
    const data = await resp.json();

    if (!findPerson(data, search)) error.innerHTML = "Pessoa não encontrada";
  } catch (e) {
    console.log(e);
  }
}

function findPerson(data, search) {
  return data.find((pessoa) => {
    if (
      pessoa.nome.toLowerCase() === search ||
      pessoa.email.toLowerCase() === search ||
      pessoa.cpf.toLowerCase() === search
    ) {
      for (let dado in pessoa) {
        el[dado].textContent = `${dado.charAt(0).toLocaleUpperCase() + dado.slice(1)}: ${pessoa[dado]}`;
        
      }
      return true; // Pessoa encontrada
    }
    for (let variavel in el) el[variavel].innerText = "";
    return false;
  });
}

function search() {
  fetchData();
}
