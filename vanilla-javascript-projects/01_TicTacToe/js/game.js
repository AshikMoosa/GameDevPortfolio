let starPlaced = false;
let planetPlaced = false;
let firstTurn = "star";

// References to DOM Elements
const gameFramer = document.querySelector(".game-framer");

// Events
gameFramer.addEventListener("click", (event) => {
  // Check if the clicked element has the class "item" or any other relevant class
  console.log("TestClick", event);
  if (event.target.classList.contains("item-slot")) {
    // Log the text content of the clicked element
    event.target.setAttribute("src", "./assets/StarTest2.png");
  }
});
console.log(gameFramer);
