import React, { useReducer } from "react";
import { winnerCalculate } from "../helper";
import Board from "./Board";
import "./GameStyle.css";

const initialState = {
  board: Array(9).fill(null),
  xIsNext: true,
};
// immutable state (không thể chỉnh sửa state)
// muốn sửa thì tạo ra một bản clone
const gameReducer = (state, action) => {
  switch (action.type) {
    case "Click": {
      // const { board, xIsNext } = state; // destructuring
      // const { index, winner } = action.payload;
      // if (winner || board[index]) return state; // return lại cái state hiện tại còn cái nextState mới là cái dùng để update từ state lên nextState
      // const nextState = JSON.parse(JSON.stringify(state)); // clone state
      // nextState.xIsNext = !xIsNext;
      // nextState.board[index] = xIsNext ? "X" : "O";
      // return nextState;
      console.log("It's working");
      break;
    }
    // console.log(state, action.payload);
    case "Reset": {
      const nextState = JSON.parse(JSON.stringify(state));
      nextState.xIsNext = true;
      nextState.board = Array(9).fill(null);
      return nextState;
    }
    default:
      break;
  }
  return state;
};

const Game = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const winner = winnerCalculate(state.board);
  const handleClick = (index) => {
    dispatch({
      type: "Click",
      payload: {
        index, // index : index
        winner,
      },
    });
  };

  const handleReset = () => {
    dispatch({
      type: "Reset",
    });
  };
  return (
    <div>
      <Board cells={state.board} onClick={handleClick}></Board>
      <div className="game-winner">{winner ? `Winner is ${winner}` : ""}</div>
      <button className="game-reset" onClick={handleReset}>
        Restart game
      </button>
    </div>
  );
};

export default Game;
