const GameBoard = require('../gameboard');
const ship = require('../ship');

test('Initializes vertical width correctly', () => {
  expect(GameBoard().getTiles().length).toBe(10);
});

test('Initializes horizontal width correctly', () => {
  expect(GameBoard().getTiles()[0].length).toBe(10);
});

test('Adds a ship to the gameboard', () => {
  expect((() => {
    let gameBoard = GameBoard();
    gameBoard.addShip(ship.Ship(3, 3, 4, ship.shipPlacement.HORIZONTAL));

    return gameBoard.getShips().length;
  })()).toBe(1);
});

test('Strikes the gameboard at the correct coordinates', () => {
  expect((() => {
    let gameBoard = GameBoard();
    gameBoard.strike(2, 4);

    return gameBoard.getTiles()[4][2];
  })()).toBeTruthy();
});

test('A ship gets hit when a missile is launched towards it', () => {
  expect((() => {
    let gameBoard = GameBoard();
    gameBoard.addShip(ship.Ship(2, 3, 4, ship.shipPlacement.HORIZONTAL));
    gameBoard.strike(3, 3);

    return gameBoard.getShips()[0].getPartsHit()[1];
  })()).toBeTruthy();
});

test('Correctly determines that there are ships remaining', () => {
  expect((() => {
    let gameBoard = GameBoard();
    gameBoard.addShip(ship.Ship(2, 3, 4, ship.shipPlacement.HORIZONTAL));
    gameBoard.strike(3, 3);

    return gameBoard.allShipsSunk();
  })()).toBeFalsy();
});

test('Correctly determines that all ships have been destroyed', () => {
  expect((() => {
    let gameBoard = GameBoard();
    gameBoard.addShip(ship.Ship(2, 3, 4, ship.shipPlacement.HORIZONTAL));

    for (let i = 0; i < 4; i++) {
      gameBoard.strike(2 + i, 3);
    }

    return gameBoard.allShipsSunk();
  })()).toBeTruthy();
});
