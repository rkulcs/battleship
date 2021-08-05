const ship = require('./ship');

const SIZE = 10;

/**
 * Renders the outline of the given ship onto the game board at the specified 
 * coordinates.
 * 
 * @param {Ship} currentShip The ship to be rendered
 * @param {number} x The x-coordinate
 * @param {number} y The y-coordinate
 * @param {HTMLElement[][]} boardTiles The tiles of the game board
 * 
 * @returns Nothing if the ship is undefined, the tiles which contain the ship
 *          otherwise
 */
const renderShip = (currentShip, x, y, boardTiles) => {
  if (currentShip === undefined) return;

  currentShip.setX(x);
  currentShip.setY(y);
  return currentShip.renderTemporarily(boardTiles);
};

/**
 * Clears a temporarily rendered ship outline from the game board.
 * 
 * @param {Ship} currentShip The ship whose outline will be removed
 * @param {HTMLElement[]} occupiedTiles The tiles which contain the ship
 * 
 * @returns An empty array which will replace the value of occupiedTiles
 */
const clearShip = (currentShip, occupiedTiles) => {
  if (currentShip === undefined) return;

  if (occupiedTiles !== undefined) currentShip.clear(occupiedTiles);

  return [];
};

/**
 * Changes the orientation of the given ship if the spacebar is pressed.
 * 
 * @param {KeyboardEvent} e The keyboard event
 * @param {Ship} currentShip The ship whose orientation is to be changed
 * @param {HTMLElement[]} occupiedTiles The tiles occupied by the ship
 * @param {HTMLElement[][]} boardTiles The tiles of the game board
 * 
 * @returns The new tiles occupied by the ship
 */
const changeShipOrientation = (e, currentShip, occupiedTiles, boardTiles) => {
  if (currentShip === undefined) return;

  if (e.keyCode === KeyboardEvent.DOM_VK_SPACE) {
    if (currentShip.getPlacement() === ship.shipPlacement.HORIZONTAL) {
      currentShip.setPlacement(ship.shipPlacement.VERTICAL);
    } else {
      currentShip.setPlacement(ship.shipPlacement.HORIZONTAL);
    }
  }

  if (currentShip.getX() !== undefined && currentShip.getY() !== undefined) {
    currentShip.clear(occupiedTiles);
    return currentShip.renderTemporarily(boardTiles);
  } else {
    return occupiedTiles;
  }
};

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

  //--- Getters ---//

  const getTiles = () => tilesHit;
  const getShips = () => ships;

  //--- Instance methods ---//

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
    let struckShip = false;

    for (let i = 0; i < getShips().length; i++) {
      if (getShips()[i].hit(x, y)) struckShip = true;
    }

    return struckShip;
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
   * Sets the event listeners of the given game board tile.
   * 
   * @param {HTMLElement} tile The tile to which the event listeners will be added
   * @param {string} boardID The ID of the board
   * @param {number} x The x-coordinate of the tile
   * @param {number} y The y-coordinate of the tile
   */
  const setEventListeners = (tile, boardID, x, y) => {
    if (boardID === 'ship-board') {

    } else {
      tile.addEventListener('click', () => {
        tile.classList.remove('active-tile');
    
        if (strike(x, y)) {
          tile.classList.add('ship-tile');
        } else {
          tile.classList.add('shipless-tile');
        }
      });
    }
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

        setEventListeners(tile, boardDiv.id, x, y);
        boardDiv.appendChild(tile);
      }
    }

    return tiles;
  };

  /**
   * Generates the ships of one player.
   * 
   * @returns An array of ship names and Ship instances.
   */
  const createShips = () => {
    return [
      {name: 'carrier',    
       obj: ship.Ship(undefined, undefined, 5, ship.shipPlacement.HORIZONTAL)},
      {name: 'battleship',
       obj: ship.Ship(undefined, undefined, 4, ship.shipPlacement.HORIZONTAL)},
      {name: 'cruiser',
       obj: ship.Ship(undefined, undefined, 3, ship.shipPlacement.HORIZONTAL)},
      {name: 'submarine',
       obj: ship.Ship(undefined, undefined, 3, ship.shipPlacement.HORIZONTAL)},
      {name: 'destroyer',
       obj: ship.Ship(undefined, undefined, 2, ship.shipPlacement.HORIZONTAL)}
    ];
  }

  /**
   * Adds event listeners to the game board for the ship placement stage of
   * the game.
   * 
   * @param {HTMLElement[][]} boardTiles The tiles to which the event listeners
   *                                   will be added
   * @param {Ship} shipsRemaining The ships to be added to the game board
   */
  const setShipPlacementEventListeners = (boardTiles, shipsRemaining) => {
    let currentShip = shipsRemaining.pop().obj;
    let occupiedTiles;

    // Change the orientation of the ship when the spacebar is pressed
    window.addEventListener('keypress', (e) => {
      occupiedTiles = changeShipOrientation(e, currentShip, occupiedTiles,
                                            boardTiles);
    });

    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        let tile = boardTiles[y][x];

        tile.addEventListener('mouseover', () => {
          occupiedTiles = renderShip(currentShip, x, y, boardTiles);
        });

        tile.addEventListener('mouseout', () => {
          occupiedTiles = clearShip(currentShip, occupiedTiles);
        });

        tile.addEventListener('click', () => {
          if (currentShip === undefined) return;
          if (currentShip.coversAnotherShip(occupiedTiles)) return;

          addShip(currentShip);
          currentShip.renderPermanently(boardTiles);
          
          if (shipsRemaining.length !== 0) {
            currentShip = shipsRemaining.pop().obj;
            currentShip.setX(x);
            currentShip.setY(y);
          } else {
            currentShip = undefined;
            deactivateTiles(boardTiles);
          }
        });
      }
    }
  };

  /**
   * Removes the active-tile class from all board tiles.
   * 
   * @param {HTMLElement[][]} boardTiles The tiles whose class list will be changed
   */
  const deactivateTiles = (boardTiles) => {
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        boardTiles[y][x].classList.remove('active-tile');
      }
    }
  };

  /**
   * Renders the ship placement process until all ships have been placed onto
   * the board.
   * @param {HTMLElement[][]} boardTiles The tiles of the game board
   */
  const renderShipPlacement = (boardTiles) => {
    setShipPlacementEventListeners(boardTiles, createShips());
  };

  return {
    getTiles,
    getShips,
    addShip,
    strike,
    allShipsSunk,
    render,
    renderShipPlacement
  };
};

module.exports = GameBoard;
