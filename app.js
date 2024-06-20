const gameContainer = document.querySelector(".gameContainer");

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
    let $fragment = document.createDocumentFragment();
    this.cells.forEach((element) => {
      let cell = document.createElement("div");
      let value = document.createElement("span");
      cell.classList.add("cell");
      cell.setAttribute("id", element.id);
      cell.setAttribute("value", element.value);
      value.textContent = element.value;
      cell.appendChild(value);
      $fragment.appendChild(cell);
    });
    gameContainer.appendChild($fragment);
  }

  cellSelectedByplayer(cellId, player, value) {
    let selected = this.cells.find((el) => el.id === cellId);
    if (selected && selected.value === "") {
      selected.player = player;
      selected.value = value;
    }
    this.renderCells();
    return selected;
  }
}
class Players {
  constructor(players) {
    this.players = players;
    this.currenPlayerIndex = 0;
    this.board = new GameBoard(9);
  }

  start() {
    this.board.renderCells();
  }
  turns(e) {
    let player = this.players[this.currenPlayerIndex];
    let values = this.players[this.currenPlayerIndex].value;
    let cellId = parseInt(e.target.getAttribute("id"));
    this.players[this.currenPlayerIndex].selections.push(cellId)
    console.log(this.players[this.currenPlayerIndex].selections)
    let result = this.board.cellSelectedByplayer(cellId, player, values);
    if (result) {
      this.currenPlayerIndex =
        (this.currenPlayerIndex + 1) % this.players.length;
    }
    return result;
  }
  checkresult() {
    let current = this.board.getCells();
    let winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let currentPlayer= this.players[this.currenPlayerIndex].selections
    winningCombinations.forEach(combination=> {
     
    })
    // verificar que 3 de las selecciones de un jugador sean las mismas de un array sin importar el orden
// rrecorrer los dos arrays= si en el array de player se encuentran 3 iguales que en winning = return ganador 
  }
}

let players = [
  { player: "one", value: "X", selections:[] },
  { player: "pc", value: "O", selections:[]},
];
let game = new Players(players);
game.start();

document.addEventListener("DOMContentLoaded", (e) => {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("cell")) {
      game.turns(e);
      game.checkresult();
    }
  });
});
