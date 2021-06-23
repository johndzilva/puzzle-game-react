import React from "react";

const GameInfo = ({ noOfMoves, minutes, seconds }) => {
  return (
    <div className="flex flex-row justify-around w-50 mb2 pa2">
      <div>
        Moves: {noOfMoves}
      </div>
      <div>
        Time: {minutes}:{seconds}
      </div>
    </div>
  );
};

export default GameInfo;
