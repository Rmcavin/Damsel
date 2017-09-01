//import all game states
const titleScreen = require('./TitleScreen.js');
console.log(titleScreen);

//start canvas!
startCanvas();

function startCanvas() {

  //grab the element and set the context
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  //Set the game states
  const GAME_STATE_TITLE = 0;
  const GAME_STATE_NEW_GAME = 1;
  const GAME_STATE_PLAY_LEVEL = 2;
  const GAME_STATE_GAME_OVER = 3;

  //set the current game state
  let currentGameState = 0;
  let currentGameStateFunction = null;

  //enable switching game states
  function switchGameState(newState) {
    currentGameState = newState;
    switch (currentGameState) {

      case GAME_STATE_TITLE:
        currentGameStateFunction = gameStateTitle;
        break;

      case GAME_STATE_NEW_GAME:
        currentGameStateFunction = gameStateNewGame;
        break;

      case GAME_STATE_PLAY_LEVEL:
        currentGameStateFunction = gameStatePlayLevel;
        break;

      case GAME_STATE_GAME_OVER:
        currentGameStateFunction = gameStateGameOver;
        break;
    }
  }

  //Event Tracker Object
  //87 is W, 65 is A, 83 is S, 68 is D. 32 is space.
  let keysDown = {};

  //Event Listeners - log the keys
  addEventListener('keydown', function(e) {
    //keep space from scrolling the screen
    if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
    }
    keysDown[e.keyCode] = true;
    console.log(keysDown);
  }, false);

  addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
  }, false);

  //Start New Game
  function gameStateNewGame(){
    console.log(`${currentGameState}`);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0,800,500);
    if (13 in keysDown) {
      switchGameState(GAME_STATE_PLAY_LEVEL);
    }
  }
  //Play Level State
  function gameStatePlayLevel() {
    console.log(`${currentGameState}`);
  }

  //Game Over State
  function gameStateGameOver() {
    console.log(`${currentGameState}`);
  }

  //Run the game
  function runGame() {
    currentGameStateFunction();
  }

  //******APPLICATION START*******
  switchGameState(GAME_STATE_TITLE);

  //application loop
  let FRAME_RATE = 40;
  let intervalTime = 1000/FRAME_RATE;
  gameLoop();

  function gameLoop() {
    runGame();
    window.setTimeout(gameLoop, intervalTime)
  }
}
