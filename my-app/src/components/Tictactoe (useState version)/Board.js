import React from "react";
import Cell from "./Cell";

const Board = ({ cells, onClick }) => {
  // Array.fill(9) -> [undefined,undefined,...]
  // Giờ mà điền hết vào thì rất tốn thời gian
  // Nên ta sẽ sử dụng map
  // const cells = ["X", null, null, "X", null, null, "X", null, null];
  // console.log(winnerCalculate(cells));

  return (
    <div className={"game-board"}>
      {/* bằng với board.map((item,index)) trong đó item là một phần tử nằm trong array, index là index của array */}
      {cells.map((item, index) => (
        <Cell
          key={index}
          value={item}
          className={item === "X" ? "x-mark" : item === "O" ? "o-mark" : ""}
          onClick={() => onClick(index)} // onClick ở đây (onclick trái) là props của thằng Cell, và thg props này gọi tới function handleClick của thằng Game.js
        ></Cell>
      ))}
    </div>
  );
};

export default Board;
