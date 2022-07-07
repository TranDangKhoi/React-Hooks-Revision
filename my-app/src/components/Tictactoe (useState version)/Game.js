import React from "react";
import { useState } from "react";
import { winnerCalculate } from "../helper";
import Board from "./Board";
import "./GameStyle.css";

const Game = () => {
  // const [board, setBoard] = useState(Array(9).fill(null));
  // const [xIsNext, setXIsNext] = useState(true); // true thì sẽ đánh X, false sẽ đánh O
  const [state, setState] = useState({
    board: Array(9).fill(null),
    xIsNext: true,
    name: "Khoi",
  });
  const winner = winnerCalculate(state.board);
  const handleClick = (index) => {
    const boardCopy = [...state.board]; // copy cái board ra thành một mảng mới
    // tại sao lại làm như vậy u may ask ??
    // bởi vì mình đang dùng cái state ban đầu (board) và sau khi bạn đã học đến by references trong mảng
    // bạn sẽ biết rằng là khi ta thay đổi giá trị trong mảng thì nó sẽ ảnh hưởng đến giá trị gốc
    // vì vậy ta phải tạo ra một bản copy để đề phòng trường hợp đó xảy ra
    if (winner || boardCopy[index]) {
      // nếu đã có người chiến thắng (winner === X hoặc winner === O hoặc tổng quan ra thì là winner !== null ), hoặc ô vuông đã được nhấn thì không cho nhấn nữa
      // nếu không có điều kiện boardCopy[index] = true thì khi nhấn tiếp lại vào ô vuông đó
      // sẽ xảy ra một lỗi là ô vuông sẽ chuyển X O luân phiên (tùy theo giá trị boolean của xIsNext trong state)
      return;
    }
    // boardCopy[index] = xIsNext ? "X" : "O"; // nếu X là lượt đánh tiếp theo thì thay đổi lần click tiếp theo giá trị là X, còn không thì là O
    // Viết kiểu dài dòng
    if (state.xIsNext === true) {
      boardCopy[index] = "X";
    } else {
      boardCopy[index] = "O";
    }
    // setBoard(boardCopy);
    // setXIsNext((xIsNext) => !xIsNext);
    setState({
      ...state,
      board: boardCopy,
      xIsNext: !state.xIsNext,
    });
    console.log(state);
  };

  const handleReset = () => {
    setState({
      board: Array(9).fill(null),
      xIsNext: true,
      ...state,
    });
  };
  return (
    <div>
      <Board cells={state.board} onClick={handleClick}></Board>
      <div className="game-winner">{winner ? `Winner is ${winner}` : ""}</div>
      <button className="game-reset" onClick={handleReset}>
        Reset game
      </button>
    </div>
  );
};

export default Game;
