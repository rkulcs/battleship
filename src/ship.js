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
   * Hits the part of the ship which is located at the given coordinates.
   * 
   * @param {*} x The x-coordinate of the missile
   * @param {*} y The y-coordinate of the missile
   * 
   * @returns True if the ship was hit, false otherwise
   */
  const hit = (x, y) => {
    if (getPlacement() === shipPlacement.HORIZONTAL) {
      if ((x >= getX()) && (x < (getX() + getLength())) && (y === getY())) {
        getPartsHit()[x - getX()] = true;
        return true;
      }
    } else {
      if ((y >= getY()) && (y < (getY() + getLength())) && (x === getX())) {
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
   * Renders the ship on the game board.
   * 
   * @param {HTMLElement[][]} boardTiles The tiles of the game board
   * 
   * @returns An array of tiles which contain the ship
   */
  const render = (boardTiles) => {
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
      occupiedTiles[i].classList.add('contains-ship');
    }

    return occupiedTiles;
  };

  /**
   * Removes the rendered ship from the game board.
   * 
   * @param {HTMLElement[]} occupiedTiles The tiles which contain the ship
   */
  const clear = (occupiedTiles) => {
    for (let i = 0; i < occupiedTiles.length; i++) {
      occupiedTiles[i].classList.remove('contains-ship');
    }
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
    hit,
    isSunk,
    render,
    clear
  };
};

module.exports = {
  shipPlacement,
  Ship
}
