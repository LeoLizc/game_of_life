import Game from './game.js';
// Get the elements from the DOM
let $canvas = document.getElementById('game-canvas');
let ctx = $canvas.getContext('2d');

// Resizing the canvas
$canvas.width = window.innerWidth;
$canvas.height = window.innerHeight;

// Define some visual constants
const aliveColor = 'white';
const deadColor = 'black';
ctx.strokeStyle = 'gray';
const game = new Game(10);

let cellSize = Math.min($canvas.width, $canvas.height)/game.boardSize;

// Game cicle
let last;

function update(time){
  
  render();
  requestAnimationFrame(update);
  
  if (last === undefined){
    last = time;
  }

  let delta = time - last;
  
  if (delta >= 1500){
    console.log('update');
    game.update();
    last = time;
  }

}

async function render() {
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0,0, $canvas.width, $canvas.height);
  
  game.getBoard().forEach((row, y)=>{
    row.forEach((val, x)=>{
      ctx.beginPath();

      if(val===1){
        ctx.fillStyle = aliveColor;
      }else{
        ctx.fillStyle = deadColor;
        
      }

      ctx.rect(x*cellSize, y*cellSize, cellSize, cellSize);
      ctx.fill();
      ctx.stroke();
    });
  });
}

$canvas.addEventListener('click',(ev)=>{

  let x = Math.floor(ev.x/cellSize);
  let y = Math.floor(ev.y/cellSize);

  game.toggleCell(x,y);
});

requestAnimationFrame(update);