// //////////////////////variables///////////////////////////
let cards = document.querySelectorAll(".card");
let complited_cards = Array.from(cards).filter(el => el.classList.contains("complited"));
let stars = Array.from(cards).filter(el => el.querySelector(".fa-solid.fa-star"));
let work_tag = Array.from(cards).filter(el => el.querySelector("#work"));
let personal_tag = Array.from(cards).filter(el => el.querySelector("#personal"));
// //////////////////////refresh//////////////////////////
function refresh() {
  cards = document.querySelectorAll(".card");
  complited_cards = Array.from(cards).filter(el => el.classList.contains("complited"));
  stars = Array.from(cards).filter(el => el.querySelector(".fa-solid.fa-star"));
  personal_tag = Array.from(cards).filter(el => el.querySelector("#personal"));
  work_tag = Array.from(cards).filter(el => el.querySelector("#work"));
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
let icon = document.querySelector(".icon");
function my_day() {
  document.getElementById("progress_text").innerText = "Today's Progress"
  select_box("none")
  progress_run("flex")
  document.getElementById("title").innerHTML = "My day";
  document.querySelector(".icon").innerHTML = `<i class="fa-regular fa-sun fa-lg"></i>`;
  document.querySelector(".icon").style.background = "linear-gradient(153deg, #5eb1efd6, #0090ffd6)";
  showDate();
  show_cards()
}

function important() {
  select_box("none")
  progress_run("flex")
  document.getElementById("progress_text").innerText = "Progress"
  document.getElementById("title").innerHTML = "Important";
  document.querySelector(".icon").innerHTML = `<i class="fa-solid fa-star" style="color:#fff;"></i>`;
  document.querySelector(".icon").style.background = "#FE9A00";
  cards.forEach(el => {
    el.style.display = "none";
  });
  stars.forEach(el => {
    el.style.display = "flex";
  })
}
function planned() {
  select_box("none")
  progress_run("none")
  document.getElementById("title").innerHTML = "Planned";
  document.querySelector(".icon").innerHTML = `<i class="fa-solid fa-star" style="color:#fff;"></i>`;
  document.querySelector(".icon").style.background = "#FE9A00";
  show_cards()
}
function all_tasks() {
  select_box("block")
  progress_run("none")
  document.getElementById("title").innerHTML = "All tasks";
  document.querySelector(".icon").innerHTML = `<i class="fa-solid fa-star" style="color:#fff;"></i>`;
  document.querySelector(".icon").style.background = "#FE9A00";
  refresh();
  document.getElementById("dateBox").innerText = `${cards.length} Total - ${complited_cards.length} Complited`;
  show_cards()
}
// /////////////////////////////////cards/////////////////////

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
  refresh();
  document.getElementById("dateBox").innerText = `${cards.length} Total - ${complited_cards.length} Complited`;
}
// ///////////////////stars//////////////////////////////
function starred(star) {
  if (star.classList.contains("fa-solid")) {
    star.classList.remove("fa-solid");
    star.classList.add("fa-regular");
  } else {
    star.classList.remove("fa-regular");
    star.classList.add("fa-solid");
  }
  refresh();
  if (document.getElementById("title").innerHTML == "Important") {
    cards.forEach(el => {
      el.style.display = "none";
    });
    stars.forEach(el => {
      el.style.display = "flex";
    })
  }
}

// ////////////////////onload///////////////////
window.onload = showDate(), progress();

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