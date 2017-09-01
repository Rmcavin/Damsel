//Title Screen State - Draw the title screen
function gameStateTitle() {
  console.log(`${currentGameState}`);
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,800,500);
  ctx.fillStyle = '#FFE4E1';
  ctx.font = '96px Dancing Script';
  ctx.textBaseline = 'top';
  ctx.textAlign="center";
  ctx.fillText('Damsel', 400, 150);
  ctx.textBaseline = 'middle';
  ctx.font = '36px Dancing Script';
  ctx.fillText('Press Space to Start', 400, 350);
  //advance to new game state when space is pressed
  if (32 in keysDown) {
    switchGameState(GAME_STATE_NEW_GAME);
  }
}


module.exports = gameStateTitle;
