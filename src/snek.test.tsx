import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { initState } from "./gameLogic";
import SnekGame from "./snek";

describe("Snek game", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("should render the start button before the game starts", () => {
    render(<SnekGame />);
    expect(screen.getByText("Start game")).toBeInTheDocument();
  });

  it("should render the snek and the apple when the game has started", () => {
    const game = initState({ running: true });
    render(<SnekGame initialGameState={game} />);

    for (const [x, y] of game.snek) {
      expect(
        screen.getByTestId(`snek__part--${x}-${y}-${game.direction}`)
      ).toBeInTheDocument();
    }

    expect(
      screen.getByTestId(`snek__apple--${game.apple[0]}-${game.apple[1]}`)
    ).toBeInTheDocument();
  });

  it("should move the snek after a timeout", () => {
    const game = initState({ running: true });
    render(<SnekGame initialGameState={game} />);

    for (const [x, y] of game.snek) {
      expect(
        screen.getByTestId(`snek__part--${x}-${y}-${game.direction}`)
      ).toBeInTheDocument();
    }

    act(() => {
      jest.advanceTimersByTime(game.delay);
    });

    for (const [x, y] of game.snek) {
      expect(
        screen.getByTestId(`snek__part--${x + 1}-${y}-${game.direction}`)
      ).toBeInTheDocument();
    }
  });

  it("should change the direction of the snek after pressing an arrow key", async () => {
    const game = initState({ running: true });
    render(<SnekGame initialGameState={game} />);

    fireEvent.keyDown(document, { key: "ArrowUp" });

    act(() => {
      jest.advanceTimersByTime(game.delay);
    });

    expect(
      await screen.findByTestId(
        `snek__part--${game.snek[0][0]}-${game.snek[0][1] - 1}-Up`
      )
    ).toBeInTheDocument();
  });

  it("should start the game when clicking the start button", async () => {
    render(<SnekGame />);
    expect(screen.getByTestId("snek-paused")).toBeInTheDocument();
    act(() => screen.getByText("Start game").click());
    expect(
      await waitFor(() => screen.findByTestId("snek-running"))
    ).toBeInTheDocument();
  });

  it("should show the crashed message after crashing", () => {
    const game = initState({ running: true });
    render(<SnekGame initialGameState={game} />);
    expect(screen.getByTestId("snek-running")).toBeInTheDocument();

    for (let i = 0; i < game.width - game.snek[0][0]; i++) {
      act(() => {
        jest.advanceTimersByTime(game.delay);
      });
    }

    expect(
      screen.getByText(/You crashed! You got \d+ points\./)
    ).toBeInTheDocument();
    expect(screen.getByText("Restart game")).toBeInTheDocument();
  });

  it("should expand the snake and show the correct score", () => {
    const game = initState({ running: true });
    game.apple = [game.snek[0][0] + 1, game.snek[0][1]];
    render(<SnekGame initialGameState={game} />);
    expect(screen.getByText("0 points")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(game.delay);
    });

    for (const [x, y] of game.snek) {
      expect(
        screen.getByTestId(`snek__part--${x}-${y}-${game.direction}`)
      ).toBeInTheDocument();
    }
    expect(
      screen.getByTestId(
        `snek__part--${game.snek[0][0] + 1}-${game.snek[0][1]}-${
          game.direction
        }`
      )
    ).toBeInTheDocument();

    expect(screen.getByText("1 point")).toBeInTheDocument();
  });
});
