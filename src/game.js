const GameBoard = require('./gameboard');
const Player = require('./player');
const ship = require('./ship');
const updateStatus = require('./status');

/**
 * Initializes the player and AI's boards.
 */
const initializePlayers = () => {
  const playerBoard = GameBoard();
  const aiBoard = GameBoard();

  const player = Player(playerBoard, aiBoard);
  const ai = Player(aiBoard, playerBoard);

  return {
    playerBoard,
    aiBoard,
    player,
    ai
  };
};

const gameLoop = () => {
  const entities = initializePlayers();
  const player = entities.player;
  const ai = entities.ai;
  const playerBoard = entities.playerBoard;
  const aiBoard = entities.aiBoard;

  const playerTiles = playerBoard.render(document.getElementById('ship-board'));
  const aiTiles = aiBoard.render(document.getElementById('target-board'));
  aiBoard.deactivateTiles(aiTiles);

  playerBoard.renderShipPlacement(playerTiles);

  ai.aiPlaceShips();

  aiBoard.setTargetBoardTiles(aiTiles, playerTiles, ai, player);
  aiBoard.activateTiles(aiTiles);
};

module.exports = gameLoop;
