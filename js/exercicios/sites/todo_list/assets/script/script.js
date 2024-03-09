const tasks = document.querySelector(".tasks");

const createTask = () => {
  const task = document.querySelector(".name").value;

  try {
    checkTask(task);
    createElements(task);
    saveData();
  } catch (e) {
    alert(e);
  }
};

const createElements = (task) => {
  const divParent = document.createElement("div");

  const liChild = document.createElement("li");
  liChild.innerHTML = task;

  const button = document.createElement("button");
  button.innerHTML = '<i class="fa-solid fa-trash"></i>';
  button.addEventListener("click", () => {
    divParent.remove();
    saveData();
  });

  divParent.appendChild(liChild);
  divParent.append(button);
  divParent.className = "task";

  tasks.appendChild(divParent);
};

const checkTask = (task) => {
  if (!task) throw new TypeError("Insert a valid task");
  if (task.length > 30) throw new RangeError("The character limit is 30");
};

const saveData = () => {
  const liTasks = tasks.querySelectorAll("li");
  let dataArray = [];

  for (let task of liTasks) {
    dataArray.push(task.innerText);
  }

  let dataToJSON = JSON.stringify(dataArray);
  localStorage.setItem("tasks", dataToJSON);
};

const getData = () => {
  let data = localStorage.getItem("tasks");
  let dataToArray = JSON.parse(data);

  if (Array.isArray(dataToArray) && dataToArray.length > 0) {
    dataToArray.forEach((data) => createElements(data));
  }
};

getData();
