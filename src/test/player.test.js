const Player = require('../player');
const GameBoard = require('../gameboard');

test('Launches missile towards correct coordinates', () => {
  expect((() => {
    let shipBoard = GameBoard();
    let targetBoard = GameBoard();

    let player = Player(shipBoard, targetBoard);
    player.makeMove(2, 2);

    return targetBoard.getTiles()[2][2];
  })()).toBeTruthy();
});

test('Does not launch missile towards occupied target', () => {
  expect((() => {
    let shipBoard = GameBoard();
    let targetBoard = GameBoard();

    let player = Player(shipBoard, targetBoard);
    player.makeMove(4, 2);

    return player.makeMove(4, 2);
  })()).toBeFalsy();
});
