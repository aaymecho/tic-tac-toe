//factory function
class Gameboard {
  constructor(pOne, pTwo) {
    this.gameBoard = [];
    this.playerOne = [];
    this.playerTwo = [];
    this.turn = true; //true when pOne false when pTwo
    this.winner = '';
    this.startGame = false;
    this.names = [];
  }
  checkSolution(input) {
    const solutions = [
      // row
      [0, 1, 2],
      [3, 4, 5],
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
      tile.textContent = "?";
      tile.addEventListener('click', () => {
        this.checkWinner();
        if (this.turn && !this.playerOne.includes(i) && !this.playerTwo.includes(i) && this.winner.length <= 0) {
          this.playerOne.push(i);
          this.turn = !this.turn;
          tile.textContent = 'X';
        }
        if (!this.turn && this.names[1] === 'Computer') {
          let unique = false;
          let number = 0;
          while (!unique && this.playerOne.length + this.playerTwo.length != 9) {
            number = Math.floor(Math.random() * 9);
            if (!this.playerOne.includes(number) && !this.playerTwo.includes(number))
              unique = true;
          }
          const computerTile = document.querySelector(`.tile-${number}`);
          computerTile.textContent = 'O';
          this.turn = !this.turn;
          this.playerTwo.push(number);
        } else if (!this.playerOne.includes(i) && !this.playerTwo.includes(i) && this.winner.length <= 0 && this.names[1] !== 'Computer') {
          this.playerTwo.push(i);
          this.turn = !this.turn;
          tile.textContent = 'O';
        }
      });
      container.appendChild(tile);
    }
    //reset button setup
    const reset = document.querySelector('.reset');
    reset.style.display = 'block';
    reset.addEventListener('click', () => this.clearBoard());
  }

  checkWinner() {
    const win = document.querySelector('.win');
    if (this.checkSolution(this.playerOne) && this.winner <= 0) {
      win.textContent = `${this.names[0]} has won!`;
      this.winner = 'winner';
    } else if (this.checkSolution(this.playerTwo) && this.winner <= 0) {
      win.textContent = `${this.names[1]} has won!`;
      this.winner = 'winner';
    } else if (this.playerOne.length + this.playerTwo.length == 9 && this.winner <= 0) {
      win.textContent = 'It was a tie!'
      this.winner = 'none';
    }
  }

  clearBoard() {
    const container = document.querySelector('.container');
    const win = document.querySelector('.win');
    this.playerOne = [];
    this.playerTwo = [];
    this.turn = true;
    this.winner = '';
    win.textContent = '';
    container.replaceChildren();
    this.setupBoard();
  }

  initalize() {
    const playerOne = document.querySelector('.playerOne');
    const playerTwo = document.querySelector('.playerTwo');
    const form = document.querySelector('.form');
    const start = document.querySelector('.start')
    const topContainer = document.querySelector('.top-container');
    start.addEventListener('click', () => {
      if (this.startGame == false && playerOne.value.length > 0) {
        this.setupBoard();
        form.style.display = 'none';
        topContainer.style.display = 'block';
        this.startGame = true;
        this.names = [playerOne.value, 'Computer']

        if (playerTwo.value.length > 0) {
          this.names = [playerOne.value, playerTwo.value]
        }
        start.style.display = 'none';
      }
    })
  }
}

const game = new Gameboard();
game.initalize()
