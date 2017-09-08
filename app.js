
//start canvas!
startCanvas();

function startCanvas() {
  //set start screen music
  let sound = document.getElementById('audio')
  sound.src = 'assets/Title.mp3'

  //grab canvas and set context as 2d
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  //set the current game state
  let currentGameState = 0;
  let currentGameStateFunction = null;
  let musicState = currentGameState;

  //Set the game states
  const GAME_STATE_TITLE = 0;
  const GAME_STATE_PLAY_LEVEL = 1;
  const GAME_STATE_GAME_OVER = 2;

  //enable switching game states
  function switchGameState(newState) {
    currentGameState = newState;
    switch (currentGameState) {
      //when the game state is updated,
      //execute the corresponding function
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
      ctx.clearRect(0,0,608,608);
      switchGameState(GAME_STATE_PLAY_LEVEL);
    }
  }

  function gameStatePlayLevel() {
    //render the game, map render is called by layer
    canvas.style.background = "";
    mapRender(0);
    mapRender(1);
    heroRender();
  }

  function gameStateGameOver() {
    //no Game over yet...
  }

  //the tile map array
  let map = {
      cols: 32,
      rows: 32,
      tileSize: 32,
      layers: [[ //terrain
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,1878,1878,1878,1878,1878,1878,119,119,119,119,119,119,119,1878,1878,1878,1878,1878,1878,1878,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,184,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,182,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,485,485,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,420,421,421,421,421,485,485,421,421,421,421,422,119,119,119,119,119,119,119,119,119,184,119,119,119,
      119,119,119,119,119,119,119,484,485,485,485,485,485,485,485,485,485,485,486,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,484,485,485,485,485,485,485,485,485,485,485,486,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,452,453,453,453,453,453,453,453,485,485,453,454,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,183,119,119,119,119,119,119,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,184,119,484,486,119,119,183,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,183,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,119,119,183,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,182,119,119,119,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,182,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,184,119,119,119,119,119,119,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,184,119,119,119,119,484,486,119,119,183,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,484,486,119,119,119,119,119,119,119,119,119,119,119,119,119,119,119,
      1399,1400,1398,1400,1399,1399,182,1400,1399,1400,1398,182,1400,1399,119,484,486,119,1400,1398,1400,1399,1399,182,1400,1399,1400,1398,182,1400,1399,1400
      ],
      [ //everything on the terrain
      0,0,0,0,817,818,819,901,781,782,781,782,781,782,781,782,781,782,901,817,818,819,0,0,0,0,0,0,0,0,0,0,
      1877,1878,1878,1878,849,850,851,933,813,814,813,814,813,814,813,814,813,814,933,849,850,851,1878,1878,1878,1878,1878,1878,1878,1878,1878,1879,
      1909,0,0,409,881,882,883,965,845,846,845,846,845,846,845,846,845,846,965,881,882,883,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,441,913,914,915,997,877,878,877,878,877,878,877,878,877,878,997,913,914,915,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,473,945,946,947,901,905,906,907,908,902,903,905,906,907,908,901,945,946,947,0,0,0,0,0,0,0,0,0,1911,
      1909,409,410,411,977,978,979,933,937,938,939,940,934,935,937,938,939,940,933,977,978,979,409,410,411,0,0,0,0,0,0,1911,
      1909,441,442,443,945,946,947,965,969,970,971,972,966,967,969,970,971,972,965,945,946,947,441,442,443,0,0,0,0,0,0,1911,
      1909,473,474,475,977,978,979,997,1001,1002,1003,1004,998,999,1001,1002,1003,1004,997,977,978,979,473,474,475,0,0,0,0,0,0,1911,
      1909,0,0,0,1009,1010,1011,0,0,0,0,0,0,0,0,0,0,0,0,1009,1010,1011,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1909,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1714,1715,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1911,
      1941,1942,1942,1942,1942,1942,1942,1942,1942,1942,1942,1942,1942,1942,1942,1746,1747,1942,1942,1942,1942,1942,1942,1942,1942,1942,1942,1942,1942,1942,1942,1943
      ]],
      //gets the tile value from an array index
      getTile: function(layer, col, row) {
        //1 is the layer over terrain
        return this.layers[layer][row*map.cols+col]
      },
      isSolidTileAtXY: function (x,y) {
        let col = Math.floor(x/map.tileSize);
        let row = Math.floor(y/map.tileSize);

        //0 is passable, all others are not.
        let tile = this.getTile(1,col,row);
        let isSolid = tile !== 0;
        return isSolid;
      },
    };

  //ensure hero image asset is loaded and ready
  let heroReady = false;
  let heroImage = new Image();
  heroImage.onload = function() {
    heroReady = true;
  }
  //hero images based on direction, forward is default
  let forward = 'assets/Hero_Forward.png';
  let backward = 'assets/Hero_Backward.png'
  let left = 'assets/Hero_Left.png';
  let right = 'assets/Hero_Right.png';
  heroImage.src = forward;

  //hero object
  let hero = {
    speed: 128,
    horiz: Math.floor((canvas.width/2)-32),
    vert: Math.floor((canvas.height/2)-32),
    x: Math.floor((26/2)*32),
    y: Math.floor((16/2)*32),
    width: 64,
    height: 64,
  };

  //renders the hero animations
  let next = 0;
  let current = 0;

  let heroRender = function() {
    if (heroReady) {
      let totalFrames = 9;

      //draws the hero using the current image
      ctx.drawImage(heroImage,next,0,hero.width,hero.height,hero.horiz,hero.vert,hero.width,hero.height);

      //moves through the sequence of images to animate her motions
      if (38 in keysDown || 40 in keysDown || 37 in keysDown || 39 in keysDown) {
        next += hero.width;
      }

      //resets to beginning of animation when the last frame is reached
      if (current == totalFrames) {
        next = 0;
        current = 0;
      }
      current++;
    }
  }

  let tileImg = new Image();
  //tileImg.src = 'assets/textures.png'
  tileImg.src = 'assets/tileAtlas3.png'
  let tilesReady = false;
  tileImg.onload = function() {
    tilesReady = true;
  }

//renders the tile map
  function mapRender(layer) {
    if (tilesReady) {

      //camera extent parameters
      let startCol = Math.floor(camera.x / map.tileSize);
      let endCol = startCol + (camera.width/map.tileSize);
      if (endCol >= map.cols) {
        endCol = 31;
      }
      if (startCol <= 0) {
        startCol = 0;
      }
      let startRow = Math.floor(camera.y/map.tileSize);
      let endRow = startRow + (camera.height/map.tileSize);
      let offsetX = -camera.x + startCol * map.tileSize;
      let offsetY = -camera.y + startRow * map.tileSize;

      //iterate through and draw the map tiles
      for (let c = startCol; c <= endCol; c++) {
        for (let r = startRow; r <= endRow; r++) {
          let tile = map.getTile(layer,c,r);

          //get tile in Image
          let imgRow = Math.floor(tile / 32); //source y
          let imgPos = tile % 32; //source x
          let x = (c - startCol) * map.tileSize + offsetX;
          let y = (r - startRow) * map.tileSize + offsetY;
          if (tile !== 0) {
            ctx.drawImage(
              tileImg, //Image
              (imgPos -1) * map.tileSize, //source x
              imgRow * map.tileSize, //source y
              map.tileSize, //source width
              map.tileSize, //source height
              Math.round(x), //target x
              Math.round(y), //target y
              map.tileSize, //target width
              map.tileSize //target height
            );
          }
        }
      }
    }
  }

  //camera object
  let camera = {
    speed: 128,
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
    maxX: map.rows * map.tileSize - canvas.width,
    maxY: map.rows * map.tileSize - canvas.height,
    //moves the camera similarly to the hero
    move: function(key, input) {
      if (key == 38) { //UP
        this.y -= Math.floor(camera.speed*input);
      }
      if (key == 40) { //DOWN
        this.y += Math.floor(camera.speed*input);
      }
      if (key == 37) { //LEFT
        this.x -= Math.floor(camera.speed*input);
      }
      if (key == 39) { //RIGHT
        this.x += Math.floor(camera.speed*input);
      }
      let col = Math.floor(hero.x/32);
      let row = Math.floor(hero.y/32);
    }
  }

  //look for collisions in direction of travel
  function checkCollision(key) {
    let up = hero.y - 32;
    let down = hero.y + 32;
    let right = hero.x + 32;
    let left = hero.x - 32;

    if (key == 38) { //UP
      return map.isSolidTileAtXY(hero.x,up);
    }

    if (key == 40) { //DOWN
      return map.isSolidTileAtXY(hero.x,down);
    }

    if (key == 37) { //LEFT
      return map.isSolidTileAtXY(left,hero.y+16);
    }

    if (key == 39) { //RIGHT
      return map.isSolidTileAtXY(right,hero.y+16);
    }
  }

  //update the hero image based on key input
  //if no collision, update the hero and camera position
    let update = function(input) {
      let notAble;
      if (38 in keysDown) { //UP
        heroImage.src = backward;
        notAble = checkCollision(38)
        if (!notAble) {
          hero.y -= Math.floor((hero.speed*input));
          camera.move(38,input);
        }
      }
      if (40 in keysDown) { //DOWN
        heroImage.src = forward;
        notAble = checkCollision(40);
        if (!notAble) {
          hero.y += Math.floor((hero.speed*input));
          camera.move(40,input);
        }
      }
      if (37 in keysDown) { //LEFT
        heroImage.src = left;
        notAble = checkCollision(37);
        if (!notAble) {
          hero.x -= Math.floor((hero.speed*input));
          camera.move(37,input);
        }
      }
      if (39 in keysDown) { //RIGHT
        heroImage.src = right;
        notAble =checkCollision(39);
        if (!notAble) {
          hero.x += Math.floor((hero.speed*input));
          camera.move(39,input);
        }
      }
    }
//run the correct game state function
  function runGameState() {
    currentGameStateFunction();
  }
//change the song based on the game state
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

        case 2:
          //NO GAMEOVER YET
          break;
      }
      //sound.load();
      //sound.play();
    }
  }
//main game loop
  let main = function() {
    runGameState();
    musicChange();
    let now = Date.now();
    let delta = now - then;
    update(delta/1000);

    then = now;

    //do again asap for animations
    let w = window;
    let fps = 20; //variable to help limit frequency/debounce requestAnimationFrame execution.
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
