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
  const getX = () => x;
  const getY = () => y;
  const getLength = () => length;
  const getPlacement = () => placement;

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
   */
  const hit = (x, y) => {
    if (getPlacement() === shipPlacement.HORIZONTAL) {
      if ((x >= getX()) && (x < (getX() + getLength())) && (y === getY())) {
        getPartsHit()[x - getX()] = true;
      }
    } else {
      if ((y >= getY()) && (y < (getY() + getLength())) && (x === getX())) {
        getPartsHit()[y - getY()] = true;
      }
    }
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

  return {
    getX,
    getY,
    getLength,
    getPlacement,
    getPartsHit,
    hit,
    isSunk,
  };
};

module.exports = {
  shipPlacement,
  Ship
}
