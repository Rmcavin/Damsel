//start canvas!
startCanvas();

function startCanvas() {

  //grab canvas and set context as 2d
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  let next = 0;
  let current = 0;

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
  }, false);

  addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
  }, false);

  let update = function(input) {
  if (38 in keysDown) { //UP
    hero.y -= hero.speed*input;
    heroImage.src = backward;
  }
  if (40 in keysDown) { //DOWN
    hero.y += hero.speed*input;
    heroImage.src = forward;
  }
  if (37 in keysDown) { //LEFT
    hero.x -= hero.speed*input;
    heroImage.src = left;
  }
  if (39 in keysDown) { //RIGHT
    hero.x += hero.speed*input;
    heroImage.src = right;
  }
    }


  function gameStateTitle() {
    console.log('title');
  }

  function gameStateNewGame() {
    console.log('new game');
  }

  function gameStatePlayLevel() {

  }

  function gameStateGameOver() {
    console.log('game over');
  }

  let heroReady = false;
  let heroImage = new Image();
  heroImage.onload = function() {
    heroReady = true;
  }

  let forward = 'assets/Hero_Forward.png';
  let backward = 'assets/Hero_Backward.png'
  let left = 'assets/Hero_Left.png';
  let right = 'assets/Hero_Right.png';
  heroImage.src = forward;

  let hero = {
    speed: 120,
    x: 0,
    y: 0
  };

  let gameRender = function() {
    if (heroReady) {
      let heroW = 64
      let heroH = 64;
      let totalFrames = 9;

      ctx.clearRect(0,0,800,500);
      ctx.drawImage(heroImage,next,0,heroW,heroH,hero.x,hero.y,heroW,heroH);

      if (38 in keysDown || 40 in keysDown || 37 in keysDown || 39 in keysDown) {
        next += heroW;
      }

      if (current == totalFrames) {
        next = 0;
        current = 0;
      }
      current++;
    }
  }

  let main = function() {
    let now = Date.now();
    let delta = now - then;
    update(delta/1000);
    gameRender();

    then = now;

  //do again asap
  let w = window;
  let fps = 20;

    function draw() {

        setTimeout(function() {
          requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
          requestAnimationFrame(main);
        }, 1000/fps)

    }
draw();

  }

  let then = Date.now();
  main();

}
