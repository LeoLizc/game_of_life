// * GAME OF LIFE CLASS
// * RULES:
// - 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// - 2. Any live cell with two or three live neighbours lives on to the next generation.
// - 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
// - 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction. 
export default class Game{
  
  boardSize = 30;
  #board = [];

  constructor(boardSize=30){
    this.boardSize = boardSize;
    this.initBoard();
  }

  initBoard(){
    this.#board = Array.from(Array(this.boardSize), () => new Array(this.boardSize).fill(0));
  }

  getBoard(){
    return this.#board;
  }

  #setCell(value, x, y){
    // verify value is a number
    if (typeof value !== 'number') {
      throw new Error('value must be a number');
    }
    // verify value is 0 or 1
    if (value !== 0 && value !== 1) {
      throw new Error('value must be 0 or 1');
    }

    // Verify x is not undefined
    if (x === undefined || typeof x !== 'number' || x < 0 || x > this.boardSize**2 - 1) {
      throw new Error('x is undefined');
    }
    // Verify y is undefined
    if (y === undefined) {
      // If y is undefined, x is the index of the cell
      // Calculate the x and y coordinates
      y = Math.floor(x / this.boardSize);
      x = x % this.boardSize;
    }

    // Verify x and y are numbers
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new Error('x and y must be numbers');
    }

    // Verify x and y are in the board
    if (x < 0 || x > this.boardSize - 1 || y < 0 || y > this.boardSize - 1) {
      throw new Error('x and y must be in the board');
    }

    // Set the cell to alive
    this.#board[y][x] = 1;
  }

  setAliveCell(x, y){
    this.#setCell(1, x, y);
  }

  setDeadCell(x, y){
    this.#setCell(0, x, y);
  }

  getCell(x, y){
    // Verify x and y are numbers
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new Error('x and y must be numbers');
    }

    // Verify x and y are in the board
    if (x < 0 || x > this.boardSize - 1 || y < 0 || y > this.boardSize - 1) {
      throw new Error('x and y must be in the board');
    }

    return this.#board[y][x];
  }

  toggleCell(x, y){
    // Verify x and y are numbers
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new Error('x and y must be numbers');
    }

    // Verify x and y are in the board
    if (x < 0 || x > this.boardSize - 1 || y < 0 || y > this.boardSize - 1) {
      throw new Error('x and y must be in the board');
    }

    this.#board[y][x] = this.#board[y][x] === 0 ? 1 : 0;
  }

  #getNeighbours(x, y){
    // Verify x and y are numbers
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new Error('x and y must be numbers');
    }

    // Verify x and y are in the board
    if (x < 0 || x > this.boardSize - 1 || y < 0 || y > this.boardSize - 1) {
      throw new Error('x and y must be in the board');
    }

    // Get the neighbours
    let neighbours = [];
    for (let i = -1; i <= 1; i++){
      for (let j = -1; j <= 1; j++){
        if (i === 0 && j === 0) continue;
        if (x + i < 0 || x + i > this.boardSize - 1 || y + j < 0 || y + j > this.boardSize - 1) continue;
        neighbours.push(this.#board[y + j][x + i]);
      }
    }
    return neighbours;
  }

  update(){
    let newBoard = Array.from(Array(this.boardSize), () => new Array(this.boardSize).fill(0));
    
    for (let y = 0; y < this.boardSize; y++){
      for (let x = 0; x < this.boardSize; x++){
        let neighbours = this.#getNeighbours(x, y);
        let aliveNeighbours = neighbours.reduce((acc, curr) => acc + curr);
        if (this.#board[y][x] === 1){
          if (aliveNeighbours < 2 || aliveNeighbours > 3){
            newBoard[y][x] = 0;
          } else {
            newBoard[y][x] = 1;
          }
        } else {
          if (aliveNeighbours === 3){
            newBoard[y][x] = 1;
          } else {
            newBoard[y][x] = 0;
          }
        }
      }
    }

    this.#board = newBoard;
  }

};