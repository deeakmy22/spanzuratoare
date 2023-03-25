let wordInput = document.getElementById("wordInput");
let underlinesDiv = document.getElementById("underlines");
let searchInput = document.getElementById("search");
let searchBtn = document.getElementById("search-btn");
let alertSuccess = document.getElementById("alert-success");
let alertDanger = document.getElementById("alert-danger");
let word;
let finds = [];
let wrongs = [];
let lifes = 4;
let restartBtn = document.getElementById("restart-btn");

function updateLifes() {
  let lifesHtml = document.getElementById("lifes");
  lifesHtml.innerHTML = lifes;
  if (!lifes) {
    alertDanger.style.display = "block";
    searchInput.disabled = true;
    searchBtn.disabled = true;
    restart();
  }
}

function saveWord() {
  word = wordInput.value.toLowerCase().split("");
  finds = new Array(word.length).fill(0);
  wordInput.style.display = "none";
  document.querySelector("button").style.display = "none";
  updateLifes();
  generateLetters();
}

wordInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    saveWord();
  }
});

function generateLetters() {
  let letters = "";
  for (let i = 0; i < finds.length; i++) {
    if (finds[i]) {
      letters += " " + word[i] + " ";
    } else {
      letters += " _ ";
    }
  }
  let isWinner = finds.every((value) => value === 1);
  if (isWinner) {
    alertSuccess.style.display = "block";
    searchInput.disabled = true;
    searchBtn.disabled = true;
    restart();
  }
  underlinesDiv.innerHTML = letters;
}

function generateWrongs() {
  let dictionaryList = document.getElementById("dictionaryList");
  dictionaryList.innerHTML = wrongs.join(", ");
  updateLifes();
}

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkLetter(search.value);
  }
});

function checkLetter() {
  let searchInput = document.getElementById("search");
  let letter = searchInput.value.toLowerCase();
  let found = false;
  for (let i = 0; i < word.length; i++) {
    if (word[i] === letter) {
      finds[i] = 1;
      found = true;
    }
  }
  if (!found) {
    wrongs.push(letter);
    --lifes;
    generateWrongs();
  }
  searchInput.value = "";
  generateLetters();
}

function restart() {
  restartBtn.style.display = "block";
  restartBtn.addEventListener("click", function () {
    location.reload();
  });
}
