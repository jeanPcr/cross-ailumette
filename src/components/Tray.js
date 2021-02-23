import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { GameContexte } from "../contexts/gameContext";
import Matche from "./matche/Matche";
const init = [
  [" ", " ", "|", " ", " "],
  [" ", "|", "|", "|", " "],
  ["|", "|", "|", "|", "|"],
];

const Tray = () => {
  const [tray, setTray] = useState(init);
  const gameContext = useContext(GameContexte);

  useEffect(() => {
    setTray(gameContext.tray);
  }, [gameContext.tray]);

  const mapMatches = (raw) => {
    return (
      <Container>
        <Row>
          {raw.map((matche, j) => {
            if (matche === "|") {
              return (
                <Col key={j}>
                  <Matche />
                </Col>
              );
            } else {
              return <Col key={j}> </Col>;
            }
          })}
        </Row>
      </Container>
    );
  };

  return (
    <Container className="m-5">
      <div>
        {tray.map((raw, i) => {
          return (
            <div key={i}>
              {mapMatches(raw)} <br />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Tray;
