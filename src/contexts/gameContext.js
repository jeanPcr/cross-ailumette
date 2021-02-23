import React from "react";
export const game = {
  isStart: false,
  isOver: false,
  start: () => {},
  tray: [],
  playerWon: false,
};
export const GameContexte = React.createContext(game);
