const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // command inititalization
    Screen.addCommand('down', 'Move cursor down one.', this.cursor.down);
    Screen.addCommand('up', 'Move cursor up one.', this.cursor.up);
    Screen.addCommand('left', 'Move cursor left one.', this.cursor.left);
    Screen.addCommand('right', 'Move cursor right one.', this.cursor.right);
    Screen.addCommand('space', 'Place character at current location in grid', this.place);

    this.cursor.setBackgroundColor();
    this.currentPlayer(this.playerTurn);
    Screen.render();
  }

  place = () => {

    Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
    this.cursor.resetBackgroundColor();
    this.cursor.row = 0;
    this.cursor.col = 0;
    this.cursor.setBackgroundColor();

    Screen.render();

    TTT.checkWin(this.grid);

    if (this.playerTurn === "O"){
      this.playerTurn = "X";
    } else {
      this.playerTurn = "O";
    }

    this.currentPlayer(this.playerTurn);
  }

  currentPlayer = (symbol) => {
    Screen.setMessage(`Current player is ${symbol}`);
    Screen.render();
  }

  static checkWin(grid) {
    let boardNotFull = false;
    let winner = null;

    // check horizontal wins
    for (let row = 0; row < grid.length; row++){
      const currentRow = grid[row];

      // check for winner
      const winnerFound = currentRow.every(ele => ele === currentRow[0]);
      if (winnerFound && 'XO'.includes(currentRow[0])){
        winner = currentRow[0];
      }

      // check if row has empty spaces
      if (!boardNotFull){
        boardNotFull = currentRow.some(ele => ele === ' ');
      }
    }

    // check vertical wins
    for (let col = 0; col < grid[0].length; col++){
      let top = grid[0][col];
      let middle = grid[1][col];
      let bottom = grid[2][col];

      if ((top === middle && top === bottom) && ('XO'.includes(top))){
        winner = top;
      }
    }

    // check diagonals
    if (grid[1][1] !== ' '){
      // diagonal values
      let middle = grid[1][1];
      let topLeft = grid[0][0];
      let topRight = grid[0][2];
      let bottomLeft = grid[2][0];
      let bottomRight = grid[2][2];

      if (middle === topLeft && middle === bottomRight){
        winner = middle;
      } else if (middle === topRight && middle === bottomLeft){
        winner = middle;
      }
    }

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    if (winner !== null){
      TTT.endGame(winner);
    } else if (!boardNotFull){
      TTT.endGame('T');
    } else {
      return false;
    }

  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
