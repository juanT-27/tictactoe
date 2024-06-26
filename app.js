const gameContainer = document.querySelector(".gameContainer");
const modal = document.querySelector(".modal");
let players = [
  { player: "one", value: "X", selections: [] },
  { player: "two", value: "O", selections: [] },
];

function showWinner(player, sentence) {
  modal.style.display = "flex";
  document.querySelector(".winner").textContent = `The player ${player}`;
  document.querySelector(".result").textContent = sentence;
  document.querySelector(".modalresult").classList.add("active");
}

let bt = document.querySelector(".restart");
bt.addEventListener("click", (e) => {
  modal.style.display = "none";
  if (gameContainer.getAttribute("gameType") === "twoPlayers") {
    twoPlayersgame.restart();
  } else {
    pc.restart();
  }
});

class GameBoard {
  constructor(spaces) {
    this.spaces = spaces;
    this.cells = this.createCellArray();
  }

  createCellArray() {
    let cellsArr = [];
    for (let i = 0; i < this.spaces; i++) {
      cellsArr.push({ id: i, value: "", player: "" });
    }
    return cellsArr;
  }

  getCells() {
    return this.cells;
  }

  renderCells() {
    gameContainer.textContent = "";
    let fragment = document.createDocumentFragment();
    this.cells.forEach((element) => {
      let cell = document.createElement("div");
      let value = document.createElement("span");
      cell.classList.add("cell");
      cell.setAttribute("id", element.id);
      cell.setAttribute("value", element.value);
      value.textContent = element.value;
      cell.appendChild(value);
      fragment.appendChild(cell);
    });
    gameContainer.appendChild(fragment);
  }

  cellSelectedByPlayer(cellId, player, value) {
    let selected = this.cells.find((el) => el.id === cellId);
    if (selected && selected.value === "") {
      selected.player = player;
      selected.value = value;
      this.renderCells();
      return true;
    }
    return false;
  }

  resetBoard() {
    this.cells = this.createCellArray();
    this.renderCells();
  }
}

class TwoPlayers {
  constructor(players) {
    this.players = players;
    this.currentPlayerIndex = 0;
    this.board = new GameBoard(9);
  }

  start() {
    this.board.renderCells();
  }

  restart() {
    this.players.forEach(player => player.selections = []);
    this.board.resetBoard();
    this.currentPlayerIndex = 0;
  }

  turns(e) {
    let player = this.players[this.currentPlayerIndex];
    let value = player.value;
    let cellId = parseInt(e.target.getAttribute("id"));
    let result = this.board.cellSelectedByPlayer(cellId, player.player, value);
    if (result) {
      player.selections.push(cellId);
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      this.checkResult();
    }
  }

  checkResult() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    let winner = false;
    for (let player of this.players) {
      for (let combo of winningCombinations) {
        if (combo.every(val => player.selections.includes(val))) {
          showWinner(player.player, "is the winner");
          winner = true;
          break;
        }
      }
    }
    if (!winner && this.players[0].selections.length + this.players[1].selections.length === 9) {
      showWinner("No one", "is the winner");
    }
  }
}

class PlvsPc extends TwoPlayers {
  constructor(players) {
    super(players);
  }

  cpuRandomPosition() {
    let emptyCells = this.board.cells.filter(cell => cell.value === "");
    if (emptyCells.length === 0) return;
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let randomPosition = emptyCells[randomIndex].id;
    this.board.cellSelectedByPlayer(randomPosition, this.players[1].player, this.players[1].value);
    this.players[1].selections.push(randomPosition);
    this.checkResult();
  }

  turnsVsPc(e) {
    let player = this.players[this.currentPlayerIndex];
    let value = player.value;
    let cellId = parseInt(e.target.getAttribute("id"));
    let result = this.board.cellSelectedByPlayer(cellId, player.player, value);
    if (result) {
      player.selections.push(cellId);
      this.checkResult();
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      if (this.currentPlayerIndex === 1) {
        this.cpuRandomPosition();
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
      }
    }
  }
}

let twoPlayersgame = new TwoPlayers(players);
let pc = new PlvsPc(players);

document.addEventListener("DOMContentLoaded", (e) => {
  document.addEventListener("click", (e) => {
    let elementClicked = e.target;
    if (elementClicked.classList.contains("gameBtn")) {
      let btnId = elementClicked.getAttribute("id");
      if (btnId === "btn-1") {
        twoPlayersgame.start();
        gameContainer.setAttribute("gameType", "twoPlayers");
      } else if (btnId === "btn-2") {
        pc.start();
        gameContainer.setAttribute("gameType", "onePlayer");
      }
    }
    if (elementClicked.classList.contains("cell")) {
      if (gameContainer.getAttribute("gameType") === "twoPlayers") {
        twoPlayersgame.turns(e);
      } else if (gameContainer.getAttribute("gameType") === "onePlayer") {
        pc.turnsVsPc(e);
      }
    }
  });
});
