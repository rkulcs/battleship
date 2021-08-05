const shipPlacement = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
};

/**
 * Represents a ship used in the game.
 * 
 * @param {number} x The x-coordinate of the top of the ship
 * @param {number} y The y-coordinate of the top of the ship
 * @param {number} length The length of the ship
 * @param {string} placement Determines whether the ship is placed
 *                           horizontally or vertically
 * @returns A new instance of Ship
 */
const Ship = (x, y, length, placement) => {
  let xCoord = x;
  let yCoord = y;
  let orientation = placement;

  const getX = () => xCoord;
  const setX = (newX) => xCoord = newX;
  const getY = () => yCoord;
  const setY = (newY) => yCoord = newY;

  const getLength = () => length;

  const getPlacement = () => orientation;
  const setPlacement = (newOrientation) => orientation = newOrientation;

  const partsHit = (() => {
    const parts = [];

    for (let i = 0; i < getLength(); i++) {
      parts[i] = false;
    }

    return parts;
  })();

  const getPartsHit = () => partsHit;

  /**
   * Determines whether the ship covers the specified coordinates
   * 
   * @param {number} x The x-coordinate
   * @param {number} y The y-coordinate
   * @returns True if the ship is on the given coordinates, false otherwise
   */
  const coversCoordinates = (x, y) => {
    if (getPlacement() === shipPlacement.HORIZONTAL) {
      if ((x >= getX()) && (x < (getX() + getLength())) && (y === getY())) {
        return true;
      }
    } else {
      if ((y >= getY()) && (y < (getY() + getLength())) && (x === getX())) {
        return true;
      }
    }

    return false;
  }

  /**
   * Hits the part of the ship which is located at the given coordinates.
   * 
   * @param {*} x The x-coordinate of the missile
   * @param {*} y The y-coordinate of the missile
   * 
   * @returns True if the ship was hit, false otherwise
   */
  const hit = (x, y) => {
    if (coversCoordinates(x, y)) {
      if (getPlacement() === shipPlacement.HORIZONTAL) {
        getPartsHit()[x - getX()] = true;
        return true;
      } else {
        getPartsHit()[y - getY()] = true;
        return true;
      }
    }

    return false;
  };

  /**
   * Determines whether the ship sank.
   * 
   * @returns True if all parts of the ship have been hit, false otherwise
   */
  const isSunk = () => {
    for (let i = 0; i < getLength(); i++) {
      if (!getPartsHit()[i]) return false;
    }

    return true;
  };

  /**
   * Renders the ship on the game board on a temporary or permanent basis.
   * 
   * @param {HTMLElement[][]} boardTiles The tiles of the game board
   * @param {string} renderType Temporary or permanent addition to the board
   * 
   * @returns An array of tiles which contain the ship
   */
  const render = (boardTiles, renderType) => {
    if ((getPlacement() === shipPlacement.HORIZONTAL) 
        && (getX() + getLength() - 1 > 9)) return;
    if ((getPlacement() === shipPlacement.VERTICAL) 
        && (getY() + getLength() - 1 > 9)) return;

    const occupiedTiles = [];

    for (let i = 0; i < getLength(); i++) {
      if (getPlacement() === shipPlacement.HORIZONTAL) {
        occupiedTiles.push(boardTiles[getY()][getX() + i]);
      } else {
        occupiedTiles.push(boardTiles[getY() + i][getX()]);
      }
    }

    for (let i = 0; i < occupiedTiles.length; i++) {
      occupiedTiles[i].classList.add(renderType);
    }

    return occupiedTiles;
  };

  /**
   * Renders the outline of the ship onto the game board. This outline may be
   * removed using the clear method.
   * 
   * @param {HTMLElement[][]} boardTiles The tiles of the game board
   * 
   * @returns The tiles occupied by the outline of the ship
   */
  const renderTemporarily = (boardTiles) => {
    return render(boardTiles, 'temp-ship');
  };

  /**
   * Permanently renders the ship onto the game board. Cannot be removed with 
   * the clear method.
   * 
   * @param {HTMLElement[][]} boardTiles The tiles of the game board
   * 
   * @returns The tiles occupied by the ship
   */
  const renderPermanently = (boardTiles) => {
    return render(boardTiles, 'permanent-ship');
  };

  /**
   * Removes the rendered ship from the game board.
   * 
   * @param {HTMLElement[]} occupiedTiles The tiles which contain the ship
   */
  const clear = (occupiedTiles) => {
    for (let i = 0; i < occupiedTiles.length; i++) {
      occupiedTiles[i].classList.remove('temp-ship');
    }
  };

  /**
   * Checks whether the tiles occupied by the ship already contain another ship.
   * 
   * @param {HTMLElement[]} shipTiles The tiles to be checked
   * 
   * @returns True if at least one of the tiles contains another ship, false
   *          otherwise
   */
  const coversAnotherShip = (shipTiles) => {
    for (let i = 0; i < shipTiles.length; i++) {
      if (shipTiles[i].classList.contains('permanent-ship')) return true;
    }
    
    return false;
  };

  return {
    getX,
    setX,
    getY,
    setY,
    getLength,
    getPlacement,
    setPlacement,
    getPartsHit,
    coversCoordinates,
    hit,
    isSunk,
    renderTemporarily,
    renderPermanently,
    clear,
    coversAnotherShip
  };
};

module.exports = {
  shipPlacement,
  Ship
}
