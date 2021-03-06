const { shipPlacement } = require("./ship");

const Player = (shipBoard, targetBoard) => {
  let wonGame = false;

  const getShipBoard = () => shipBoard;
  const getTargetBoard = () => targetBoard;
  
  const isWinner = () => wonGame;

  const setWinner = (value) => wonGame = value;

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
   * 
   * @returns The x- and y-coordinates of the AI's move.
   */
  const aiMove = () => {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);

    while (!makeMove(x, y)) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    }

    return {
      x: x,
      y: y
    };
  };

  /**
   * Randomly places the AI's ships onto its ship board.
   */
  const aiPlaceShips = () => {
    const MAX_ATTEMPTS = 30;
    let placedShips = 0;

    while (placedShips !== 5) {
      let ships = getShipBoard().createShips();

      for (let i = 0; i < ships.length; i++) {
        let shipPlaced = false;

        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
          let x = Math.floor(Math.random() * 10);
          let y = Math.floor(Math.random() * 10);
          let placement = Math.floor(Math.random() * 10) >= 5 ? shipPlacement.HORIZONTAL
                                                             : shipPlacement.VERTICAL;

          ships[i].obj.setX(x);
          ships[i].obj.setY(y);
          ships[i].obj.setPlacement(placement);

          if (ships[i].obj.validLocation(getShipBoard().getShips())) {
            getShipBoard().addShip(ships[i].obj);
            shipPlaced = true;
            placedShips++;
            break;
          }
        }

        if (!shipPlaced) {
          placedShips = 0;
          getShipBoard().removeShips();
          break;
        }
      }
    }
  };

  return {
    getShipBoard,
    getTargetBoard,
    isWinner,
    setWinner,
    makeMove,
    aiMove,
    aiPlaceShips
  };
};

module.exports = Player;
