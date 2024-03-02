const localStorageKey = "notebox";

function newTask() {
  let input = document.getElementById("new-task");
  
  if (!input.value) {
    alert("Digite algo...")
  }
  else if (validadeIfExistNewTask()) {
    alert("Ja existe uma Task com essa descrição");
  } 
  else {
    const boardAdd = document.getElementById("board-add");
    const boardTasks = document.getElementById("board-tasks");
    boardAdd.style.display = "none";
    boardTasks.style.display = "block";
    
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let heightBox = document.getElementById("heightBox");
    values.push({
      name: input.value,
      height: heightBox.value
    });
    localStorage.setItem(localStorageKey,JSON.stringify(values));
    showValues();
    input.value = "";
  }
}

function validadeIfExistNewTask() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let input = document.getElementById("new-task");
  let exists = values.find(x => x.name == input.value);
  return !exists ? false : true;
}

function showValues() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let campo = document.getElementById("board-main");
  campo.innerHTML = "";
  for (let i = 0;i < values.length;i++) {
    campo.innerHTML += `<textarea style="height:${values[i]['height'] + "px"};margin-bottom: 5px;">${values[i]['name']}</textarea><button onclick='removeItem("${values[i]['name']}")' style="height:${values[i]['height'] + "px"};"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" /></svg>`;
  }
}

function removeItem(data) {
  // A ultima função Ethel
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let index = values.findIndex(x => x.name == data);
  values.splice(index, 1);
  localStorage.setItem(localStorageKey, JSON.stringify(values));
  showValues();
}

function openBoardAdd() {
  const boardAdd = document.getElementById("board-add");
  const boardTasks = document.getElementById("board-tasks");
  if (boardAdd.style.display == "none") {
    boardAdd.style.display = "block";
    boardTasks.style.display = "none";
  } else {
    boardAdd.style.display = "none";
    boardTasks.style.display = "block";
  }
}

showValues();