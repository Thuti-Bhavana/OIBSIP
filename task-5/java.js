let date1=new Date();
let date=date1.getDay();
let month=date1.getMonth();
var week=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
var months = [
  "January", "February", 
  "March", "April", "May", 
  "June", "July", "August",
  "September", "October", 
  "November", "December"
];
let year=date1.getFullYear();
var fulldate=week[date]+","+date1.getDate()+" "+months[month]+" "+year;
document.getElementById('date').innerHTML=fulldate;

document.getElementById('form').addEventListener('submit', savetodo);

function savetodo(e) {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  
let task = {
    title,
    description,
    isCompleted: false // add isCompleted property to each task to keep track of completed status
};
  
if (localStorage.getItem('list') === null) {
    let list = [];
    list.push(task);
    localStorage.setItem('list', JSON.stringify(list));
} else {
    let list = JSON.parse(localStorage.getItem('list'));
    list.push(task);
    localStorage.setItem('list', JSON.stringify(list));
}
  
getlist();
  
  
  document.getElementById('form').reset();
  e.preventDefault();
}

function toggleCompletedStatus(index) {
  let list = JSON.parse(localStorage.getItem('list'));
  list[index].isCompleted = !list[index].isCompleted; // toggle completed status
  localStorage.setItem('list', JSON.stringify(list));
  getlist();
}

function deleteitem(title) {
  let list = JSON.parse(localStorage.getItem('list'));
  for (let i = 0; i < list.length; i++) {
    if (list[i].title == title) {
      list.splice(i, 1);
    }
  }

localStorage.setItem('list', JSON.stringify(list));
getlist();
}


function edititem(title) {
  let list = JSON.parse(localStorage.getItem('list'));
  for (let i = 0; i < list.length; i++) {
    if (list[i].title == title) {
      let newTitle = prompt("Enter new title", list[i].title);
      let newDescription = prompt("Enter new description", list[i].description);
      list[i].title = newTitle;
      list[i].description = newDescription;
    }
  }
  localStorage.setItem('list', JSON.stringify(list));
  getlist();
}

function getlist() {
  let list = JSON.parse(localStorage.getItem('list'));
  let tasksView = document.getElementById('list');
  tasksView.innerHTML = '';
  
  for (let i = 0; i < list.length; i++) {
    let title = list[i].title;
    let description = list[i].description;
    let isCompleted = list[i].isCompleted; // get completed status

    
    let titleStr = isCompleted ? `<s>${title}</s>` : title;
    let descStr = isCompleted ? `<s>${description}</s>` : description;
    
    tasksView.innerHTML +=
      `<div class="container-fluid"> 
        <div class="card mb-1"  style="background-color:#fbbede;">
          <div class="card-body">
            <div class="row my-1">
              <div class="col-sm-3 text-left">
                <p>${titleStr}</p>
              </div>
              <div class="col-sm-3 text-left">
                <p>${descStr}</p>
              </div>
              <div class="col-sm-2 text-right">
                <button onclick="edititem('${title}')"><i class="fa-sharp fa-solid fa-pencil-alt"></i></button>
              </div>
              <div class="col-sm-2 text-right">
                <a onclick="deleteitem('${title}')" class="btn btn-danger ml-5">X</a>
              </div>
            </div>  
          </div>
        </div>
      </div>
    `;
  }
}

getlist();