import React from "react";
export const initGame = {
  isStart: false,
  isOver: false,
  start: () => {},
};
export const GameContexte = React.createContext(initGame);
