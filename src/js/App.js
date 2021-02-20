import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../components/header/Header";
import Landing from "../components/landing/Landing";
import Logs from "../components/Logs";
import PlayerControls from "../components/PlayerControls";
import Score from "../components/Score";
import Tray from "../components/Tray";
import { GameContexte } from "../contexts/gameContext";
import "./App.css";

const App = () => {
  const initGame = {
    isStart: false,
    isOver: false,
    start: () => {
      setGameState({ ...initGame, isStart: true });
    },
  };

  const [gameState, setGameState] = useState(initGame);

  return (
    <div>
      <Header />
      <Container className="mt-5">
        <GameContexte.Provider value={gameState}>
          {gameState.isStart ? (
            <>
              {" "}
              <Score />
              <Tray />
              <Container>
                <Row>
                  <Col>
                    <PlayerControls />
                  </Col>
                  <Col>
                    <Logs />
                  </Col>
                </Row>
              </Container>
            </>
          ) : (
            <Landing />
          )}
        </GameContexte.Provider>
      </Container>
    </div>
  );
};

export default App;
