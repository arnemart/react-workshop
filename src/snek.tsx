import React, { useEffect, useReducer } from "react";
import { Action, GameState, initState, reducer } from "./gameLogic";

type GameProps = {
  game: GameState;
  dispatch: React.Dispatch<Action>;
};

const points = (pts: number) => `${pts} point${pts == 1 ? "" : "s"}`;

const GameMessage = ({ game, dispatch }: GameProps) => (
  <div className="snek__message">
    {game.crashed && <div>You crashed! You got {points(game.score)}.</div>}
    <button onClick={() => dispatch("Start")}>
      {game.crashed ? "Restart game" : "Start game"}
    </button>
  </div>
);

export type SnekProps = {
  /** Coordinates for the snek (array of `[x,y]` values, e.g. `[[2,1], [1,1]]`) */
  snek: GameState["snek"];
  /** Where is he pointing */
  direction: GameState["direction"];
};
export const Snek = ({ snek, direction }: SnekProps) => (
  <>
    {snek.map(([x, y], i) => (
      <div
        key={i}
        className={`snek__part ${
          i == 0 ? `snek__part--head snek__part--head-${direction}` : ""
        }`}
        data-testid={`snek__part--${x}-${y}-${direction}`}
        style={{ gridColumn: x + 1, gridRow: y + 1 }}
      />
    ))}
  </>
);

type AppleProps = { apple: GameState["apple"] };
const Apple = ({ apple }: AppleProps) => (
  <div
    className="snek__apple"
    data-testid={`snek__apple--${apple[0]}-${apple[1]}`}
    style={{
      gridColumn: apple[0] + 1,
      gridRow: apple[1] + 1,
    }}
  />
);

const GameBoard = ({ game, dispatch }: GameProps) => (
  <div>
    <div
      className="snek"
      data-testid={`snek-${game.running ? "running" : "paused"}`}
      style={{
        gridTemplate: `repeat(${game.width}, 1fr) / repeat(${game.height}, 1fr)`,
      }}
    >
      {game.running ? (
        <>
          <Snek snek={game.snek} direction={game.direction} />
          <Apple apple={game.apple} />
        </>
      ) : (
        <GameMessage game={game} dispatch={dispatch} />
      )}
    </div>
    <div>{points(game.score)}</div>
  </div>
);

type SnekGameProps = { initialGameState?: GameState };
const SnekGame = ({ initialGameState = initState() }: SnekGameProps) => {
  const [game, dispatch] = useReducer(reducer, initialGameState);

  useEffect(() => {
    const timer = setTimeout(() => dispatch("Move"), game.delay);
    return () => clearTimeout(timer);
  }, [game.tick, game.running]);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowLeft":
        case "ArrowRight":
          dispatch(e.key.slice(5) as Action);
      }
    };
    document.addEventListener("keydown", handleKeyboard);
    return () => document.removeEventListener("keydown", handleKeyboard);
  }, []);

  return <GameBoard game={game} dispatch={dispatch} />;
};

export default SnekGame;
