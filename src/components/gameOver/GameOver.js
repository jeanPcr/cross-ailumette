import React, { useContext, useEffect, useState } from "react";
import { game, GameContexte } from "../../contexts/gameContext";
import "./gameContext.css";

const GameOver = () => {
  const gameContext = useContext(GameContexte);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (gameContext.playerWon) {
      setMessage("I lost.. snif.. but I’ll get you next time!! ");
    } else {
      setMessage("You lost, too bad..");
    }
  }, [gameContext]);
  return (
    <div>
      <h1>{message}</h1>
      <div className="my-5">
        <div className="robot" />
      </div>
    </div>
  );
};

export default GameOver;
