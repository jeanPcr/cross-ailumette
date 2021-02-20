import React, { useContext } from "react";
import "./landing.css";
import { GameContexte } from "../../contexts/gameContext";
const Landing = () => {
  const gameContext = useContext(GameContexte);
  const startGame = () => {
    console.log(gameContext);
  };

  return (
    <div
      style={{
        marginTop: "100px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Welcome to the matches' game !</h1>
      <div className="my-5">
        <div className="robot" />
      </div>

      <button
        style={{
          fontSize: "2em",
        }}
        onClick={gameContext.start}
        className="btn btn-primary p-3 "
      >
        Start the game
      </button>
    </div>
  );
};

export default Landing;
