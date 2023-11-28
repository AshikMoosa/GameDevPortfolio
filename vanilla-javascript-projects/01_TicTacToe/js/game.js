let starScore = 0;
let planetScore = 0;
let totalMatches = 1;
let currentTurn = "star";
let gameStarted = false;
let hoverElem;
const gameBoard = document.querySelector("main").cloneNode(true);

// Represents the Tic-Tac-Toe game board
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

// References to DOM Elements
const mainElem = document.querySelector("main");
const gameFramer = document.querySelector(".game-framer");
const gameFramerItems = gameFramer.querySelectorAll(".item1, .item2, .item3, .item4, .item5, .item6, .item7, .item8, .item9");
const starElem = document.querySelector(".star-turn");
const starElemFilled = document.querySelector(".star-turn-filled");
const planetElem = document.querySelector(".planet-turn");
const planetElemFilled = document.querySelector(".planet-turn-filled");
const spinnerElem = document.querySelector(".spinner-container");
const restartElem = document.querySelector(".restart");
const restartElemModal = document.querySelector(".restart-modal");
const nextRoundElemModal = document.querySelector(".next-round-modal");
const gameModal = document.querySelector(".game-modal");
const gameModalIconContainer = gameModal.querySelector(".game-icon");
const gameModalIcon = gameModal.querySelector(".game-icon-image");
const gameModalHeading = gameModal.querySelector(".result-heading");
const starScoreElem = document.querySelector(".star-score");
const planetScoreElem = document.querySelector(".planet-score");

console.log(gameFramerItems);
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
  placeElement(event);
});

// Turn Events
// Click Event - Setting Turn with spinner
spinnerElem.addEventListener("click", () => setTurn());

// Restart Event
// Click Event - Restart Game
restartElem.addEventListener("click", () => restartGame());
restartElemModal.addEventListener("click", () => restartGame());

// Next Round
nextRoundElemModal.addEventListener("click", () => continueGame());

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

// Set Turns
function setTurn() {
  if (starElemFilled.hidden) {
    selectStar();
  } else {
    selectPlanet();
  }
}

//  Place Element - Place Star or Planet in position
function placeElement(event) {
  const elemClassName = event.target.parentElement.className;

  // Use a regular expression to extract the number from the class name
  const match = elemClassName.match(/\d+/);

  if (match) {
    const column = parseInt(match[0], 10);
    let row = column <= 3 ? 0 : column > 3 && column <= 6 ? 1 : 2;
    board[row][(column - 1) % 3] = currentTurn === "star" ? "X" : "O";
  }

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

  console.log(board);
  const winner = checkWinner(board);
  console.log(winner);
  if (winner === "Draw") {
    console.log("It's a draw!");
    showResult(winner);
  } else if (winner) {
    console.log(`Player ${winner} wins!`);
    showResult(winner);
  } else {
    console.log("No winner yet.");
  }
}

// Restart Game
function restartGame() {
  // resetting intial states
  // starScore = 0;
  // planetScore = 0;
  // currentTurn = "star";
  // gameStarted = false;

  location.reload();
  // Reset inital DOM Tree
  // mainElem.innerHTML = "";
  // console.log(gameBoard);
  // gameBoard.childNodes.forEach((section) => {
  //   if (section.nodeType === 1) {
  //     mainElem.appendChild(section);
  //   }
  // });
}

//  Check Winner - Win, Lose or Draw
function checkWinner(board) {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
      return board[row][0];
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
      return board[0][col];
    }
  }

  // Check diagonals
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return board[0][2];
  }

  // No winner, it's a draw
  if ([0, 1, 2].every((row) => !board[row].includes(""))) {
    return "Draw";
  }
}

// Show Result - Modal indication Win or Draw
function showResult(winner) {
  gameModal.style.display = "flex";
  if (winner === "X") {
    mainElem.setAttribute("star-wins", "");
    starScore++;
    totalMatches++;
  } else if (winner === "O") {
    mainElem.setAttribute("planet-wins", "");
    gameModalIcon.src = "./assets/PlanetDefault.svg";
    gameModalHeading.textContent = "PLANET WINS";
    planetScore++;
    totalMatches++;
  } else {
    mainElem.setAttribute("draw-match", "");
    gameModalHeading.textContent = "DRAW MATCH";
    const gameIcon = document.createElement("img");
    gameIcon.src = "./assets/PlanetDefault.svg";
    gameModalIconContainer.appendChild(gameIcon);
    totalMatches++;
  }
  updateScores();

  console.log("scores:", starScore, planetScore);
}

// Update Scores
function updateScores() {
  starScoreElem.innerText = starScore + "/" + totalMatches;
  planetScoreElem.innerText = planetScore + "/" + totalMatches;
}

// Continue Game
function continueGame() {
  // Remove win or draw modal
  gameModal.style.display = "none";
  mainElem.removeAttribute("star-wins");
  mainElem.removeAttribute("planet-wins");
  mainElem.removeAttribute("draw-match");

  // Reset board matrix
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  // Remove last child from all squares/game-framer items & set pointer events to all
  gameFramerItems.forEach(function (item) {
    // Check if the item has more than 3 child nodes
    if (item.children.length > 3) {
      // Remove the last child node
      item.removeChild(item.lastElementChild);
      // Set pointer-events property to 'all'
      item.style.pointerEvents = "all";
    }
  });
}
