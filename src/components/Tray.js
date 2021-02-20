import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Matche from "./matche/Matche";
const init = [
  [" ", " ", "|", " ", " "],
  [" ", "|", "|", "|", " "],
  ["|", "|", "|", "|", "|"],
];

// const [matches, setMatches] = useState([]);

const mapMatches = (raw) => {
  return (
    <Container>
      <Row>
        {raw.map((matche, j) => {
          if (matche === "|") {
            return (
              <Col key={j}>
                <Matche />{" "}
              </Col>
            );
          } else {
            return <Col key={j}>-</Col>;
          }
        })}
      </Row>
    </Container>
  );
};

const Tray = () => {
  return (
    <Container>
      <div>
        {init.map((raw, i) => {
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
