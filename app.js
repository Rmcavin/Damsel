//start canvas!
startCanvas();

function startCanvas() {
  let sound = document.getElementById('audio')
  sound.src = 'assets/Title.mp3'
  console.log(sound.src);
  //grab canvas and set context as 2d
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  //set the current game state
  let currentGameState = 0;
  let currentGameStateFunction = null;
  let musicState = currentGameState;

  let next = 0;
  let current = 0;

  //Set the game states
  const GAME_STATE_TITLE = 0;
  const GAME_STATE_PLAY_LEVEL = 1;
  const GAME_STATE_GAME_OVER = 2;

  //enable switching game states
  function switchGameState(newState) {
    currentGameState = newState;
    switch (currentGameState) {

      case GAME_STATE_TITLE:
        currentGameStateFunction = gameStateTitle;
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
    console.log(currentGameState);
    canvas.style.background = "url('assets/background_intro.png')";

    ctx.textBaseline = 'top';
    ctx.textAlign = "center";
    ctx.fillStyle = '#FFE4E1';

    //Title font
    ctx.font = '96px Brush Script Std, Brush Script MT, cursive';
    ctx.fillText('Damsel', 405, 180);

    //Press start font
    ctx.font = '36px Brush Script Std, cursive';
    ctx.fillText('Press Space to Start', 405, 362);

    //advance to new game state when space is pressed
    if (32 in keysDown) {
      ctx.clearRect(0,0,832,512);
      switchGameState(GAME_STATE_PLAY_LEVEL);
    }
  }

  function gameStatePlayLevel() {
    console.log(currentGameState);
    canvas.style.background = "url('assets/grass.png')";
    gameRender();
  }

  function gameStateGameOver() {
    console.log(currentGameState);
  }

  let tileSize = 32;
  let MapRenderer = {};

  MapRenderer.draw = function() {
    let self = this;
    this.context.clearRect(0,0,this.w,this.h);
    this.context.fillStyle = 'black';
    (this.map).each(function(row,i) {
      (row).each(function(tile,j) {
        if (tile !== '0') {
          self.drawTile(j,i);
        }
      });
    });
  }
  MapRenderer.drawTile = function(x,y) {
    this.context.fillRect(
      x * this.tileSize, y *this.tileSize, this.tileSize, this.tileSize);
  }

  let gameRender = function() {
    if (heroReady) {
      let heroW = 64
      let heroH = 64;
      let totalFrames = 9;

      ctx.clearRect(0,0,832,512);
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
    x: (canvas.width/2)-32,
    y: (canvas.height/3.5)-32
  };

  let map = [
    ['0','0','w','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','s','w','0','0'],
    ['0','0','w','f','0','0','0','0','0','0','0','0','0','0','f','w','0','0','0','0','0','0','0','w','0','0'],
    ['0','0','w','f','0','0','0','0','0','0','0','0','0','0','f','w','0','0','0','0','0','0','0','w','0','0'],
    ['0','0','w','f','0','0','0','0','0','0','0','0','0','0','f','w','0','0','0','0','0','0','0','w','0','0'],
    ['0','0','w','f','0','0','0','0','0','0','0','0','0','0','f','w','0','0','0','0','0','0','0','w','0','0'],
    ['0','0','w','f','0','0','0','0','0','0','0','0','0','0','f','w','0','0','0','0','0','0','0','w','0','0'],
    ['0','0','w','f','0','0','0','0','0','0','0','0','0','0','f','w','0','0','0','0','0','0','0','w','0','0'],
    ['0','0','w','f','0','0','0','0','0','0','0','0','0','0','f','w','0','0','0','0','0','0','0','w','0','0'],
    ['0','0','w','f','0','0','0','0','0','0','0','0','0','0','f','w','0','0','0','0','0','0','0','w','0','0'],
    ['0','0','w','f','0','0','0','0','0','0','0','0','0','0','f','w','0','0','0','0','0','0','0','w','0','0'],
    ['0','0','w','f','0','0','0','0','0','0','0','0','0','0','f','w','0','0','0','0','0','0','0','w','0','0'],
    ['0','0','w','w','w','w','w','0','0','0','0','w','w','w','w','w','0','0','0','0','0','0','0','w','0','0'],
    ['0','0','s','s','s','s','s','0','0','0','0','s','s','s','s','s','0','0','0','0','0','0','0','w','0','0'],
    ['0','0','s','s','s','s','s','0','0','0','0','s','s','s','s','s','0','0','0','0','0','0','0','w','0','0'],
    ['0','0','s','s','s','s','s','0','0','0','0','s','s','s','s','s','0','0','0','0','0','0','0','w','0','0'],
    ['0','0','s','s','s','s','s','0','0','0','0','s','s','s','s','s','0','0','0','0','0','0','0','w','g','g']
  ]

  function runGameState() {
    currentGameStateFunction();
  }

  function musicChange() {
    if (musicState !== currentGameState) {
      musicState = currentGameState;
      switch (musicState) {

        case 0:
          sound.src = 'assets/Title.mp3';
          break;

        case 1:
          sound.src = 'assets/MainGame.mp3';
          break;

        case GAME_STATE_GAME_OVER:
          console.log('no music yet');
          break;
      }
      sound.load();
      sound.play();
    }
  }

  let main = function() {
    runGameState();
    musicChange();
    let now = Date.now();
    let delta = now - then;
    update(delta/1000);


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
  switchGameState(GAME_STATE_TITLE);
  let then = Date.now();
  main();
  }
