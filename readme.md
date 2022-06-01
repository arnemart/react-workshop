# Minimum Viable Snek

Welcome to React workshop! This is the sample project, a simple snek game.

## How to build and run etc

First, `npm install`. Then:

- To run dev server: `npm start`, app now runs on <http://localhost:1234>
- To do a production build: `npm run build`, build output now lives in `./dist`
- To run tests: `npm test`

## Some ideas for additional features to add:

- Add a scoreboard (use i.e. localStorage to store the scores)
- Make it mobile friendly (i.e. adaptive width, touch events)
- Add a pause function
- Keyboard controls to start/restart/pause
- Multiple fruits at once??
- Make a special fruit that gives extra points but disappears after a short while?
- Bad fruits that give negative points
- Obstacles
- Multiple lives
- Make the snek move faster if the player holds down the arrow key
- Make a settings screen to adjust grid size, difficulty etc
- Change to (or make a setting for) relative controls (i.e. right/left arrow keys turns left/right relative to the snek)
- Make a two player mode with two sneks on the same board and two players on the same keyboard

## Or maybe make another grid-based game altogether!

- Conway's game of life
- Light's out (click a cell to higlight the four orthogonally adjacent cells, the goal is to highlight all cells in the fewest clicks)
- Tic tac toe (or maybe something like five-in-a-row on a larger grid)
- Tetris? Maybe too ambitious, would be fun though
- Whack-a-mole (click the squares that light up as quickly as possible, before they disappear)
- Battleship through a websocket server

## Or maybe work on the existing app to make it more production ready:

- Add some more tests to make it bulletproof
- Add eslint and an eslint config to enforce a code style, maybe configure prettier some more
- Add husky to run eslint and prettier on commit, to enforce the code style
- Deploy to azure! Why not
