const SIZE = 10;

/**
 * Represents the gameboard onto which the ships are placed.
 * 
 * @returns A new instance of GameBoard
 */
const GameBoard = () => {
  const tilesHit = (() => {
    const tiles = [];

    for (let i = 0; i < SIZE; i++) {
      tiles[i] = [];

      for (let j = 0; j < SIZE; j++) {
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

  /**
   * Renders the gameboard.
   * 
   * @param {HTMLElement} boardDiv The HTML element which represents the board
   * @returns An array of gameboard tiles.
   */
  const render = (boardDiv) => {
    const tiles = [];

    for (let y = 0; y < SIZE; y++) {
      tiles[y] = [];

      for (let x = 0; x < SIZE; x++) {
        let tile = document.createElement('div');
        tiles[y][x] = tile;

        tile.className = 'tile';
        tile.classList.add('active-tile');
        tile.innerHTML = '\u00B7';

        // TODO: Update the tile on click
        tile.addEventListener('click', () => {
          tile.classList.remove('active-tile');
        });

        boardDiv.appendChild(tile);
      }
    }

    return tiles;
  };

  return {
    getTiles,
    getShips,
    addShip,
    strike,
    allShipsSunk,
    render
  };
};

module.exports = GameBoard;
