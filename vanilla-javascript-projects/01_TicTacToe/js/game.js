let starScore = 0;
let planetScore = 0;
let currentTurn = "star";
let gameStarted = false;
let hoverElem;
const intialGameBoard = document.querySelector("main").cloneNode(true);

// References to DOM Elements
const mainElem = document.querySelector("main");
const gameFramer = document.querySelector(".game-framer");
const starElem = document.querySelector(".star-turn");
const starElemFilled = document.querySelector(".star-turn-filled");
const planetElem = document.querySelector(".planet-turn");
const planetElemFilled = document.querySelector(".planet-turn-filled");
const spinnerElem = document.querySelector(".spinner-container");
const restartElem = document.querySelector(".restart");

console.log(intialGameBoard, starElem, planetElem, spinnerElem);

// Frame Events - Interactions
// Hover Event - onMouseOver
gameFramer.addEventListener("mouseover", (event) => {
  hoverElem = event.target;
  if (hoverElem.classList.contains("item-slot")) {
    if (currentTurn === "star") {
      hoverElem.parentElement.children[1].hidden = false;
      hoverElem.parentElement.children[2].hidden = true;
    } else {
      hoverElem.parentElement.children[1].hidden = true;
      hoverElem.parentElement.children[2].hidden = false;
    }
  }
});

// Hover Event - onMouseLeave
gameFramer.addEventListener("mouseout", (event) => {
  if (event.target.classList.contains("item-slot")) {
    event.target.parentElement.children[1].hidden = true;
    event.target.parentElement.children[2].hidden = true;
  }
});

// Click Event - Placing Objects
gameFramer.addEventListener("click", (event) => {
  console.log("clicked cell");
  if (!gameStarted) {
    gameStarted = true;
    spinnerElem.disabled = true;
  }
  const placedElem = document.createElement("img");
  placedElem.classList.add("item-slot");
  placedElem.alt = "placed-background";
  if (event.target.classList.contains("item-slot")) {
    if (currentTurn === "star") {
      placedElem.setAttribute("src", "./assets/StarTest2.png");
      selectPlanet();
    } else {
      placedElem.setAttribute("src", "./assets/PlanetTest2.png");
      selectStar();
    }
    event.target.parentElement.appendChild(placedElem);
    event.target.parentElement.style.pointerEvents = "none";
  }
});

// Turn Events
// Click Event - Setting Turn with spinner
spinnerElem.addEventListener("click", (event) => {
  if (starElemFilled.hidden) {
    selectStar();
  } else {
    selectPlanet();
  }
});

// Restart Event
// Click Event - Restart Game
restartElem.addEventListener("click", () => restartGame());

// Helper Methods
// SelectPlanet
function selectPlanet() {
  currentTurn = "planet";
  planetElemFilled.hidden = false;
  planetElem.hidden = true;
  starElemFilled.hidden = true;
  starElem.hidden = false;
}

// SelectStar
function selectStar() {
  currentTurn = "star";
  starElemFilled.hidden = false;
  starElem.hidden = true;
  planetElemFilled.hidden = true;
  planetElem.hidden = false;
}

// Restart Game
function restartGame() {
  // resetting intial states
  starScore = 0;
  planetScore = 0;
  currentTurn = "star";
  gameStarted = false;

  // Removing Event listeners - TODO

  // Reset inital DOM Tree
  mainElem.innerHTML = "";
  mainElem.appendChild(intialGameBoard);
}
