//start canvas!
startCanvas();

function startCanvas() {
  let sound = document.getElementById('audio')
  sound.src = 'assets/Title.mp3'
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
    canvas.style.background = "url('assets/grass.png')";
    mapRender();
    heroRender();
  }

  function gameStateGameOver() {
    console.log(currentGameState);
  }

  let map = {
      cols: 28,
      rows: 17,
      tileSize: 32,
      tiles: [
      0,0,0,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,5,5,0,0,0,
      0,0,0,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,5,5,0,0,0,
      0,0,0,5,5,1,2,1,3,1,2,3,0,8,7,0,1,1,1,2,1,3,1,5,5,0,0,0,
      0,0,0,5,5,1,0,0,0,0,0,0,0,7,8,0,0,0,0,0,0,0,2,5,5,0,0,0,
      0,0,0,5,5,3,0,0,0,0,0,0,0,8,7,0,0,0,0,0,0,0,1,5,5,0,0,0,
      0,0,0,5,5,1,0,0,0,0,0,0,0,7,8,0,0,0,0,0,0,0,1,5,5,0,0,0,
      0,0,0,5,5,1,0,0,0,0,0,0,0,8,7,0,0,0,0,0,0,0,1,5,5,0,0,0,
      0,0,0,5,5,1,0,0,0,0,0,0,0,7,8,0,0,0,0,0,0,0,3,5,5,0,0,0,
      0,0,0,5,5,2,0,0,0,0,0,0,0,8,7,0,0,0,0,0,0,0,2,5,5,0,0,0,
      0,0,0,5,5,1,0,0,0,0,0,0,0,7,8,0,0,0,0,0,0,0,3,5,5,0,0,0,
      0,0,0,5,5,1,0,0,0,0,0,0,0,8,7,0,0,0,0,0,0,0,1,5,5,0,0,0,
      0,0,0,5,5,1,0,0,0,0,0,0,0,7,8,0,0,0,0,0,0,0,1,5,5,0,0,0,
      0,0,0,5,5,3,0,0,0,0,0,0,0,8,7,0,0,0,0,0,0,0,3,5,5,0,0,0,
      0,0,0,5,5,5,5,5,0,0,0,0,0,7,0,0,0,0,0,0,5,5,5,5,5,0,0,0,
      0,0,0,6,6,6,6,6,0,0,0,0,0,8,0,0,0,0,0,0,6,6,6,6,6,0,0,0,
      0,0,0,6,6,6,6,6,0,0,0,0,0,0,8,0,0,0,0,0,6,6,6,6,6,0,0,0,
      0,0,0,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,6,6,6,6,6,0,0,0
    ],
    getTile: function(col, row) {
      return this.tiles[row*map.cols +col]
    },
    isSolidTileAtXY: function(x,y) {
      let col = Math.floor(x/this.tileSize);
      let row = Math.floor(y/this.tileSize);

      //4,5,6 are solid/not walkable

      return this.tiles.reduce(function(res,tile,index) {
        let cell = this.getTile(col,row);
        let isSolid = cell === 4 || cell === 5 || cell === 6;
        return res || isSolid;
      }).bind(this), false;
    },
    getCol: function(x) {
      return Math.floor(x/this.tileSize);
    },
    getRow: function(y) {
      return Math.floor(y/this.tileSize);
    },
    getX: function(col) {
      return col * this.tileSize;
    },
    getY: function(row) {
      return row * this.tileSize;
    }
  };

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
    y: (canvas.height/3.5)-32,
    width: 64,
    height: 64
  };

  let heroRender = function() {
    if (heroReady) {
      let heroW = 64
      let heroH = 64;
      let totalFrames = 9;

      //ctx.clearRect(0,0,832,512);
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

  let tileImg = new Image();
  tileImg.src = 'assets/textures.png'
  let tilesReady = false;
  tileImg.onload = function() {
    tilesReady = true;
  }

  function mapRender() {
    if (tilesReady) {
      for (var c = 0; c < map.cols; c++) {
        for (var r = 0; r < map.rows; r++) {
          let tile = map.getTile(c,r);
          if (tile !== '0') {
            ctx.drawImage(
              tileImg, //Image
              (tile -1) * map.tileSize, //source x
              0, //source y
              map.tileSize, //source width
              map.tileSize, //source height
              c * map.tileSize, //target x
              r * map.tileSize, //target y
              map.tileSize, //target width
              map.tileSize //target height
            );
          }
        }
      }
    }
  }

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
          ctx.clearRect(0,0,832,512);
        }, 1000/fps)
    }
    draw();
  }
  switchGameState(GAME_STATE_TITLE);
  let then = Date.now();
  main();
  }
