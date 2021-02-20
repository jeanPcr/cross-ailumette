import React from "react";
import { Form } from "react-bootstrap";

const PlayerControls = () => {
  return (
    <Form className="p-4">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Line</Form.Label>
        <Form.Control type="line" placeholder="Enter a line" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Matches</Form.Label>
        <Form.Control type="line" placeholder="Enter a number of matches" />
      </Form.Group>

      <button className=" btn btn-primary" type="submit">
        Play
      </button>
    </Form>
  );
};

export default PlayerControls;
