// //////////////////////variables///////////////////////////

let cards = document.querySelectorAll(".card");
let complited_cards = Array.from(cards).filter(el => el.classList.contains("complited"));
let stars = Array.from(cards).filter(el => el.querySelector(".fa-solid.fa-star"));
let work_tag = Array.from(cards).filter(el => el.querySelector("#work"));
let personal_tag = Array.from(cards).filter(el => el.querySelector("#personal"));
let icon = document.querySelector(".icon");
let new_card = document.querySelector(".new_card");
let aside_buttons = document.querySelectorAll(".aside_button")

// //////////////////////refresh//////////////////////////

function refresh() {
  cards = document.querySelectorAll(".card");
  complited_cards = Array.from(cards).filter(el => el.classList.contains("complited"));
  stars = Array.from(cards).filter(el => el.querySelector(".fa-solid.fa-star"));
  work_tag = Array.from(cards).filter(el => el.querySelector("#work"));
  personal_tag = Array.from(cards).filter(el => el.querySelector("#personal"));
  icon = document.querySelector(".icon");
  document.querySelector(".overdue_cards").innerHTML = document.querySelector(".today_cards").innerHTML = document.querySelector(".tomorrow_cards").innerHTML = ""
  progress();
}
// //////////////////date////////////////////////
function showDate() {
  const today = new Date();
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayName = days[today.getDay()];
  const monthName = months[today.getMonth()];
  const dayNumber = today.getDate();
  document.getElementById("dateBox").innerText = `${dayName}, ${monthName} ${dayNumber}`;
}
///////////////////////////progress////////////////////////
function progress() {
  document.getElementById("progress_tasks").innerText = `${complited_cards.length} of ${cards.length} Complited`;
  document.querySelector(".progress").style.width = `${(complited_cards.length / cards.length) * 100}%`;
  document.querySelector(".content").style.display = "block";
  if (complited_cards.length == 0) {
    document.querySelector(".content").style.display = "none";
  }
}
function progress_run(value) {
  document.querySelector(".progress_box").style.display = `${value}`;
}
// ////////////////////show cards////////////////////
function show_cards() {
  cards.forEach(el => {
    el.style.display = "flex";
  });
}
// ////////////////////select box////////////////////
function select_box(value) {
  document.querySelector(".select_options").style.display = `${value}`;
}

// //////////////////////// aside buttons //////////////////////////
function aside_button_clicked(btn) {
  aside_buttons.forEach(el => {
    el.style.background = "#fff";
  })
  btn.style.background = "#F5F5F5"
}
// /////////////////////////////////my day page/////////////////////
function my_day() {
  refresh()
  document.querySelector(".cards").style.display = "flex"
  document.getElementById("progress_text").innerText = "Today's Progress"
  select_box("none")
  progress_run("flex")
  document.getElementById("title").innerHTML = "My day";
  document.querySelector(".icon").innerHTML = `<i class="fa-regular fa-sun fa-lg"></i>`;
  document.querySelector(".icon").style.background = "linear-gradient(160deg, #5eb1ef, #0090ff)";
  showDate();
  show_cards();
  document.querySelector(".planned_page").style.display = "none"
}
// /////////////////////////////////important page/////////////////////

function important() {
  refresh()
  document.querySelector(".cards").style.display = "flex"
  select_box("none")
  progress_run("flex")
  document.getElementById("progress_text").innerText = "Progress"
  document.getElementById("title").innerHTML = "Important";
  document.querySelector(".icon").innerHTML = `<i class="fa-solid fa-star" style="color:#fff;"></i>`;
  document.querySelector(".icon").style.background = "linear-gradient(160deg, #ffb900, #fe9a00)";
  cards.forEach(el => {
    el.style.display = "none";
  });
  stars.forEach(el => {
    el.style.display = "flex";
  })
  document.getElementById("dateBox").innerText = `${stars.length} Starred`;
  document.querySelector(".planned_page").style.display = "none"
}
// /////////////////////////////////planned page/////////////////////
function planned() {
  refresh()
  select_box("none")
  progress_run("none")
  document.getElementById("title").innerHTML = "Planned";
  document.querySelector(".icon").innerHTML = `  <i class="fa-regular fa-calendar" style="color:#fff;"></i>`;
  document.querySelector(".icon").style.background = "linear-gradient(160deg, #0d74ce, #0588f0)";
  document.getElementById("dateBox").innerText = `${cards.length} Scheduled`;
  document.querySelector(".cards").style.display = "none"
  document.querySelector(".planned_page").style.display = "block"
  planned_categories()
}
// /////////////////////////////////all tasks page/////////////////////
function all_tasks() {
  refresh();
  document.querySelector(".cards").style.display = "flex"
  select_box("block")
  progress_run("none")
  document.getElementById("title").innerHTML = "All tasks";
  document.querySelector(".icon").innerHTML = `<i class="fa-regular fa-square-check" style="color:#fff"></i>`;
  document.querySelector(".icon").style.background = "linear-gradient(360deg, #113264, #0d74ce)";
  document.getElementById("dateBox").innerText = `${cards.length} Total - ${complited_cards.length} Complited`;
  show_cards()
  document.querySelector(".planned_page").style.display = "none"
}
function category_clicked(btn) {
  document.querySelectorAll(".category").forEach(el => {
    el.style.background = "#F5F5F5";
  })
  btn.style.background = "#fff"
  document.querySelector(".planned_page").style.display = "none"
}
// ///////////////////////cards/////////////////////

// ////////////////////////complited cards/////////////////////
function complited(line) {
  if (line.checked) {
    line.closest(".card").querySelector(".task_title").classList.add("over_line");
    line.closest(".card").querySelector(".task_title").style.color = "gray";
    line.closest(".card").classList.add("complited");
  } else {
    line.closest(".card").querySelector(".task_title").classList.remove("over_line");
    line.closest(".card").querySelector(".task_title").style.color = "#0A0A0A";
    line.closest(".card").classList.remove("complited");
  }
  
  document.getElementById("dateBox").innerText = `${cards.length} Total - ${complited_cards.length} Complited`;
  progress()
}
// ///////////////////stars//////////////////////////////
function starred(star) {
  refresh();
  if (star.classList.contains("fa-solid")) {
    star.classList.remove("fa-solid");
    star.classList.add("fa-regular");
  } else {
    star.classList.remove("fa-regular");
    star.classList.add("fa-solid");
  }
  if (document.getElementById("title").innerHTML == "Important") {
    cards.forEach(el => {
      el.style.display = "none";
    });
    stars.forEach(el => {
      el.style.display = "flex";
    })
  }
}
// ////////////////////New task///////////////////

// ////////////////////onload///////////////////

function tag(value) {
  if (value == "personal") {
    cards.forEach(el => {
      el.style.display = "none";
    })
    personal_tag.forEach(el => {
      el.style.display = "flex";
    })
  } else if (value == "work") {
    cards.forEach(el => {
      el.style.display = "none";
    })
    work_tag.forEach(el => {
      el.style.display = "flex";
    })
  } else {
    show_cards()
  }
}
let title = document.getElementById("new_card_title");
let desc = document.getElementById("desc");
let date = document.getElementById("date");
let priority = document.getElementById("priority");
let tag_select = document.getElementById("tag");
function open_new() {
  new_card.style.display = "flex";
}
function close_new() {
  new_card.style.display = "none";
  title.value = desc.value = date.value = "";
  priority.value = "Medium";
}


function add_card() {
  title = document.getElementById("new_card_title");
  desc = document.getElementById("desc");
  date = document.getElementById("date");
  date_format = new Date(date.value);
  priority = document.getElementById("priority");
  tag_select = document.getElementById("tag");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let color = "#737373";
  if (new Date(date.value) >= new Date()) {
  } else {
    color = "#DC2626";
  }
  if (title.value === "") {
    alert("ُEnter the title");
  }
  else {
    const card = document.createElement("div")
    card.classList.add("card")
    card.innerHTML += `                
      <div class="card_content">
      <input type="checkbox" name="" id="" class="check_box" onclick="complited(this)">
      <div class="card_text">
      <p class="task_title">${title.value}</p>
      <div>
      
      <button type="button" class="tag" id="${tag_select.value}">${tag_select.value}</button>
      <button type="button" class="date" style="color:${color}"><i class="fa-solid fa-calendar"></i>${months[date_format.getMonth()]} ${date_format.getDate()}</button>
      </div>
      
      </div>
      </div>
      <div><i class="fa-regular fa-star" style="color: #ffb900; cursor: pointer;"
      onclick="starred(this)"></i>
      </div>
      `;
    card.style.display = "flex"

    card.setAttribute("date_value", date.value);
    document.querySelector(".cards").appendChild(card)
  }
  close_new();
  refresh();
  if (document.getElementById("title").innerHTML == "My day") {
    my_day()
  } else if (document.getElementById("title").innerHTML == "Important") {
    important()
  } else if (document.getElementById("title").innerHTML == "Planned") {
    planned()
  } else if (document.getElementById("title").innerHTML == "All tasks") {
    all_tasks()
  }

};
function planned_categories() {
  refresh()
  let overdue_cards = Array.from(cards).filter(el => new Date(el.getAttribute("date_value")).getDate() < new Date().getDate())
  let today_cards = Array.from(cards).filter(el => new Date(el.getAttribute("date_value")).getDate() == new Date().getDate())
  let tomorrow_cards = Array.from(cards).filter(el => new Date(el.getAttribute("date_value")).getDate() == new Date().getDate() + 1)
  console.log(overdue_cards)
  overdue_cards.forEach(el => {
    document.querySelector(".overdue_cards").append(el.cloneNode(true))
  })
  today_cards.forEach(el => {
    document.querySelector(".today_cards").append(el.cloneNode(true))
  })
  tomorrow_cards.forEach(el => {
    document.querySelector(".tomorrow_cards").append(el.cloneNode(true))
  })


}
window.onload = function () { showDate(); refresh(); my_day();}
