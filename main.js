//factory function
class Gameboard {
  constructor() {
    this.gameBoard = [];
    this.playerOne = [];
    this.playerTwo = [];
    this.turn = true; //true when pOne false when pTwo
  }
  checkSolution(input) {
    const solutions = [
      // row
      [0, 1, 2],
      [3, 4, 5], w
      [6, 7, 8],

      // column
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      // diagonal
      [0, 4, 8],
      [2, 4, 6]
    ];
    return solutions.some((solution) => {
      return solution.every(element => input.includes(element));
    });
  }

  setupBoard() {
    const container = document.querySelector('.container');
    for (let i = 0; i < 9; i++) {
      const tile = document.createElement('button');
      tile.className = `tile-${i}`;
      container.appendChild(tile);
    }

  }
  updateBoard() {

  }

}


const game = new Gameboard();
game.setupBoard();
