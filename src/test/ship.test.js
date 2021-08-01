const { test, expect } = require('@jest/globals');
const ship = require('../ship');

test('Initializes partsHit with the correct number of parts', () => {
  expect(ship.Ship(0, 0, 3, ship.shipPlacement.HORIZONTAL)
    .getPartsHit().length).toBe(3);
});

test('Hits the correct part of a vertical ship with a missile', () => {
  expect((() => {
    let testShip = ship.Ship(2, 3, 4, ship.shipPlacement.VERTICAL);
    testShip.hit(2, 5);

    return testShip.getPartsHit()[2];
  })()).toBeTruthy();
});

test('Hits the correct part of a horizontal ship with a missile', () => {
  expect((() => {
    let testShip = ship.Ship(5, 6, 3, ship.shipPlacement.HORIZONTAL);
    testShip.hit(7, 6);

    return testShip.getPartsHit()[2];
  })()).toBeTruthy();
});

test('Does not damage any parts of the ship when a missile misses it', () => {
  expect((() => {
    let testShip = ship.Ship(4, 3, 4, ship.shipPlacement.HORIZONTAL);
    testShip.hit(6, 5);

    for (let i = 0; i < testShip.getLength(); i++) {
      if (testShip.getPartsHit()[i]) return false;
    }

    return true;
  })()).toBeTruthy();
});

test('Ship is declared sunk when all of its parts are hit', () => {
  expect((() => {
    let testShip = ship.Ship(4, 4, 5, ship.shipPlacement.HORIZONTAL);

    for (let i = 0; i < testShip.getLength(); i++) {
      testShip.getPartsHit()[i] = true;
    }

    return testShip.isSunk();
  })()).toBeTruthy();
});

test('Ship is not declared sunk when not all of its parts are hit', () => {
  expect((() => {
    let testShip = ship.Ship(4, 4, 5, ship.shipPlacement.HORIZONTAL);

    for (let i = 0; i < 2; i++) {
      testShip.getPartsHit()[i] = true;
    }

    return testShip.isSunk();
  })()).toBeFalsy();
});
