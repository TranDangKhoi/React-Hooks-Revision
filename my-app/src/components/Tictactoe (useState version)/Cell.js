import React from "react";

// Object destructuring
// const student = {
//   name: "Khoi",
//   age: 19,
// };
// const { name, age } = student;

const Cell = ({ value, onClick, className }) => {
  return (
    <div className={`game-cell ${className}`} onClick={onClick}>
      {value}
    </div>
  );
};

export default Cell;
