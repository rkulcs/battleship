const Player = (shipBoard, targetBoard) => {
  const getShipBoard = () => shipBoard;
  const getTargetBoard = () => targetBoard;

  /**
   * Launches a missile towards the specified coordinates on the target board.
   * 
   * @param {number} x The x-coordinate of the target board
   * @param {number} y The y-coordinate of the target board
   * @returns True if the targeted tile is unoccupied, false otherwise
   */
  const makeMove = (x, y) => {
    if (getTargetBoard().getTiles()[y][x]) return false;

    getTargetBoard().getTiles()[y][x] = true;
    return true;
  };

  /**
   * Launches a missile towards a random tile on the target board.
   */
  const aiMove = () => {
    let x = Math.floor(Math.random() * 9);
    let y = Math.floor(Math.random() * 9);

    while (!makeMove(x, y));
  };

  return {
    getShipBoard,
    getTargetBoard,
    makeMove,
    aiMove
  };
};

module.exports = Player;
