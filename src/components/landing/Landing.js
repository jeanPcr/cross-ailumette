import React, { useContext, useState } from "react";
import "./landing.css";
import { GameContexte } from "../../contexts/gameContext";
import { Alert } from "react-bootstrap";
import { initPyramid } from "../../js/ailumettes-electron";

const Landing = () => {
  const gameContext = useContext(GameContexte);
  const [chooseBase, setchooseBase] = useState(false);
  const [base, setBase] = useState(0);
  const [error, setError] = useState("");

  const init = () => {
    setchooseBase(true);
  };
  const enterBase = () => {
    if (parseInt(base) % 2 === 0) {
      return setError("Error: the number must be odd");
    } else if (parseInt(base) < 5) {
      return setError("Error: not enough ailumettes");
    } else if (
      parseInt(base) < 0 ||
      isNaN(parseInt(base)) ||
      parseInt(base) === undefined
    ) {
      return setError("Error: invalid input (positive number expected)");
    }
    gameContext.tray = initPyramid(base);
    gameContext.start();
  };

  const handleChange = (e) => {
    setBase(e.target.value);
  };
  const errorAlert = () => {
    if (error !== "") {
      return <Alert variant="danger">{error} </Alert>;
    }
  };

  return (
    <div
      style={{
        marginTop: "50px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!chooseBase ? (
        <>
          <h1>Welcome to the matches' game !</h1>
          <div className="my-5">
            <div className="robot" />
          </div>

          <button
            style={{
              fontSize: "2em",
            }}
            onClick={init}
            className="btn btn-primary p-3 "
          >
            Start the game
          </button>
        </>
      ) : (
        <>
          <h1>Enter the number of ailumettes of the pyramid base :</h1>
          <div className="my-2">
            <div className="robot" />
          </div>
          <input
            className="form-control w-25 my-3"
            type="number"
            value={base}
            onChange={handleChange}
          />

          <button
            style={{
              fontSize: "2em",
              marginBottom: "2em",
            }}
            onClick={enterBase}
            className="btn btn-primary p-3 "
          >
            Go
          </button>
        </>
      )}
      {errorAlert()}
    </div>
  );
};

export default Landing;
