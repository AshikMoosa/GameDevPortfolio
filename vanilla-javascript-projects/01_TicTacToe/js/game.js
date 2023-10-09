let starPlaced = false;
let planetPlaced = false;
let currentTurn = "star";
let hoverElem;

// References to DOM Elements
const gameFramer = document.querySelector(".game-framer");

// Events - Interactions
// Hover Event - onMouseOver
gameFramer.addEventListener("mouseover", (event) => {
  // debugger;
  console.log("Hovered", event);
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
  // Check if the clicked element has the class "item" or any other relevant class
  // debugger;
  console.log("Hovered", event);
  if (event.target.classList.contains("item-slot")) {
    event.target.parentElement.children[1].hidden = true;
    event.target.parentElement.children[2].hidden = true;
  }
});

// Click Event - Placing Objects
gameFramer.addEventListener("click", (event) => {
  // Check if the clicked element has the class "item" or any other relevant class
  console.log("TestClick", event);
  if (event.target.classList.contains("item-slot")) {
    // Log the text content of the clicked element
    event.target.setAttribute("src", "./assets/StarTest2.png");
  }
});
console.log(gameFramer);
