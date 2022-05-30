import {
  Action,
  initState,
  randomFreePosition,
  reducer,
  Snek,
} from "./gameLogic";

const performActions = (actions: Action[], game = initState()) =>
  actions.reduce((game, action) => reducer(game, action), game);

describe("Snek game logic", () => {
  it("should find an empty spot on the game board to place the apple", () => {
    const snek = [
      [0, 0],
      [1, 0],
    ] as Snek;
    for (let i = 0; i < 100; i++) {
      const pos = randomFreePosition(snek, 2, 2);
      expect([0, 1]).toContain(pos[0]);
      expect(pos[1]).toEqual(1);
    }
  });

  it("should move the snek after the 'Move' action", () => {
    const game = initState({ running: true });
    const nextState = reducer(game, "Move");
    game.snek.forEach(([x, y], i) => {
      expect(nextState.snek[i][0]).toEqual(x + 1);
      expect(nextState.snek[i][1]).toEqual(y);
    });
  });

  it("should change direction when moving", () => {
    const game = initState({ running: true });
    const willTurn = reducer(game, "Up");
    expect(willTurn.direction).toEqual(game.direction);
    expect(willTurn.nextDirection).toEqual("Up");
    const didTurn = reducer(willTurn, "Move");
    expect(didTurn.direction).toEqual("Up");
    expect(didTurn.nextDirection).toEqual("Up");
  });

  it("should not perform illegal turns", () => {
    let game = performActions(["Start", "Left"]);
    expect(game.nextDirection).toEqual("Right");
    game = performActions(["Up", "Move"], game);
    expect(game.direction).toEqual("Up");
    game = reducer(game, "Down");
    expect(game.nextDirection).toEqual("Up");
  });

  it("should eat apples", () => {
    const game = initState({ running: true });
    game.apple = [game.snek[0][0] + 1, game.snek[0][1]];
    expect(game.score).toEqual(0);
    const didScore = reducer(game, "Move");
    expect(didScore.score).toEqual(1);
    expect(didScore.snek.length).toEqual(game.snek.length + 1);
    expect(didScore.delay).toBeLessThan(game.delay);
    expect(didScore.apple).not.toEqual(game.apple);
  });

  it("should not move if the game is not running", () => {
    const game = initState();
    const didntMove = reducer(game, "Move");
    expect(didntMove.tick).toEqual(0);
    expect(didntMove.snek).toEqual(game.snek);
    const didMove = performActions(["Start", "Move"], didntMove);
    expect(didMove.tick).toEqual(1);
    expect(didMove.snek).not.toEqual(game.snek);
  });

  it("should crash if the snek hits the right wall", () => {
    let game = initState({ running: true });
    game = performActions(
      Array(game.width - game.snek[0][0] - 1).fill("Move"),
      game
    );
    expect(game.crashed).toBeFalsy();
    game = reducer(game, "Move");
    expect(game.crashed).toBeTruthy();
  });

  it("should crash if the snek hits the top wall", () => {
    let game = performActions(["Start", "Up", "Move"]);
    while (game.snek[0][1] > 0) {
      game = reducer(game, "Move");
      expect(game.crashed).toBeFalsy();
    }
    game = reducer(game, "Move");
    expect(game.crashed).toBeTruthy();
  });

  it("should crash if the snek hits the left wall", () => {
    let game = performActions(["Start", "Down", "Move", "Left", "Move"]);
    while (game.snek[0][0] > 0) {
      game = reducer(game, "Move");
      expect(game.crashed).toBeFalsy();
    }
    game = reducer(game, "Move");
    expect(game.crashed).toBeTruthy();
  });

  it("should crash if the snek hits the bottom wall", () => {
    let game = performActions(["Start", "Down"]);
    while (game.snek[0][1] < game.height - 1) {
      game = reducer(game, "Move");
      expect(game.crashed).toBeFalsy();
    }
    game = reducer(game, "Move");
    expect(game.crashed).toBeTruthy();
  });

  it("should crash if the snek hits itself", () => {
    let game = initState();
    game.apple = [game.snek[0][0] + 1, game.snek[0][1]];
    game = performActions(
      ["Start", "Move", "Down", "Move", "Left", "Move", "Up"],
      game
    );
    expect(game.crashed).toBeFalsy();
    game = reducer(game, "Move");
    expect(game.crashed).toBeTruthy();
  });
});
