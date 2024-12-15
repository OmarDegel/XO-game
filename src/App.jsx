import Player from "./Components/player";
import GameBoard from "./Components/gameBoard";
import { useState } from "react";
import GameOver from "./Components/game-over.jsx";
import Log from "./Components/log";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
const INTIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const PLAYERS = {
  X: "player 1",
  O: "player 2",
};
function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function deriveGameBoard(gameTurn) {
  let gameBoard = [...INTIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;

}
function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}
function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);
  const gameBoard = deriveGameBoard(gameTurn);
  const activePlayer = deriveActivePlayer(gameTurn);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurn.length == 9 && !winner;
  function HandleSelection(rowIndex, colIndex) {
    setGameTurn((prevTurn) => {
      const currentPlayer = activePlayer;
      const updatedTun = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updatedTun;
    });
  }
  function HandelPlayerName(symbol, newName) {
    setPlayers((prePlayers) => {
      return {
        ...prePlayers,
        [symbol]: newName,
      };
    });
  }
  function HandleRestart() {
    setGameTurn([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={HandelPlayerName}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={HandelPlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={HandleRestart} />
        )}
        <GameBoard onSelectSquare={HandleSelection} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
