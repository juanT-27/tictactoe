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
class TwoPlayers {
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
    this.players[this.currenPlayerIndex].selections.push(cellId);
    let result = this.board.cellSelectedByplayer(cellId, player, values);
    if (result) {
      this.currenPlayerIndex =
        (this.currenPlayerIndex + 1) % this.players.length;
    }
    this.checkresult();

    return result;
  }
  checkresult() {
    // let current = this.board.getCells();
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
    for (let i = 0; i < this.players.length; i++) {
      for (let j = 0; j < winningCombinations.length; j++) {
        if (
          winningCombinations[j].every((val) =>
            players[i].selections.includes(val)
          )
        ) {
          console.log(winningCombinations[j]);
          alert(`winner`);
        }
      }
    }
  }
}

let players = [
  { player: "one", value: "X", selections: [] },
  { player: "two", value: "O", selections: [] },
];

let twoPlayersgame = new TwoPlayers(players);

document.addEventListener("DOMContentLoaded", (e) => {
  document.addEventListener("click", (e) => {
    let elementClicked = e.target;
    if (elementClicked.classList.contains("gameBtn")) {
      let btnId = elementClicked.getAttribute("id");

      if (btnId === "btn-1") {
        twoPlayersgame.start();
      }else{
        PlvsPc.start()
      }
    }
    if (elementClicked.classList.contains("cell")) {
      twoPlayersgame.turns(e);
    }
  });
});
