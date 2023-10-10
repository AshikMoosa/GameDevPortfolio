let starScore = 0;
let planetScore = 0;
let currentTurn = "star";
let gameStarted = false;
let hoverElem;

// References to DOM Elements
const gameFramer = document.querySelector(".game-framer");
const starElem = document.querySelector(".star-turn");
const starElemFilled = document.querySelector(".star-turn-filled");
const planetElem = document.querySelector(".planet-turn");
const planetElemFilled = document.querySelector(".planet-turn-filled");
const spinnerElem = document.querySelector(".spinner-container");

console.log(starElem, planetElem, spinnerElem);

// Frame Events - Interactions
// Hover Event - onMouseOver
gameFramer.addEventListener("mouseover", (event) => {
  hoverElem = event.target;
  if (event.target.classList.contains("item-slot")) {
    if (currentTurn === "star") {
      event.target.parentElement.children[1].hidden = false;
      event.target.parentElement.children[2].hidden = true;
    } else {
      event.target.parentElement.children[1].hidden = true;
      event.target.parentElement.children[2].hidden = false;
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
      currentTurn = "planet";
      planetElemFilled.hidden = false;
      planetElem.hidden = true;
      starElemFilled.hidden = true;
      starElem.hidden = false;
    } else {
      placedElem.setAttribute("src", "./assets/PlanetTest2.png");
      currentTurn = "star";
      starElemFilled.hidden = false;
      starElem.hidden = true;
      planetElemFilled.hidden = true;
      planetElem.hidden = false;
    }
    event.target.parentElement.appendChild(placedElem);
  }
});

// Turn Events
// Click Event - Setting Turn
spinnerElem.addEventListener("click", (event) => {
  if (starElemFilled.hidden) {
    currentTurn = "star";
    starElemFilled.hidden = false;
    starElem.hidden = true;
    planetElemFilled.hidden = true;
    planetElem.hidden = false;
  } else {
    currentTurn = "planet";
    planetElemFilled.hidden = false;
    planetElem.hidden = true;
    starElemFilled.hidden = true;
    starElem.hidden = false;
  }
});
