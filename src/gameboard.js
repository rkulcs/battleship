/**
 * Represents the gameboard onto which the ships are placed.
 * 
 * @returns A new instance of GameBoard
 */
const GameBoard = () => {
  const tilesHit = (() => {
    const tiles = [];

    for (let i = 0; i < 10; i++) {
      tiles[i] = [];

      for (let j = 0; j < 10; j++) {
        tiles[i][j] = false;
      }
    }

    return tiles;
  })();

  const ships = [];

  const getTiles = () => tilesHit;
  const getShips = () => ships;

  /**
   * Adds the given ship to the gameboard.
   * 
   * @param {Ship} ship The ship to be added
   */
  const addShip = (ship) => {
    getShips().push(ship);
  };

  /**
   * Launches a missile towards the given coordinates of the board.
   * 
   * @param {number} x The x-coordinate of the missile
   * @param {number} y The y-coordinate of the missile
   */
  const strike = (x, y) => {
    getTiles()[y][x] = true;

    for (let i = 0; i < getShips().length; i++) {
      getShips()[i].hit(x, y);
    }
  };

  /**
   * Determines whether all ships on the gameboard sank.
   * 
   * @returns True if there are no ships remaining, false otherwise
   */
  const allShipsSunk = () => {
    for (let i = 0; i < getShips().length; i++) {
      if (!getShips()[i].isSunk()) return false;
    }

    return true;
  };

  return {
    getTiles,
    getShips,
    addShip,
    strike,
    allShipsSunk
  };
};

module.exports = GameBoard;
