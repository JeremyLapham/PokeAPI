import React from "react";
import { Button, Col } from "react-bootstrap";

export default function ActionBtns({ text, clickFunction }) {
  return (
    <Col lg={2} md={12} sm={12} className="d-flex justify-content-center">
      <Button variant="" className="searchPokemonBtn" onClick={clickFunction}>
        {text}
      </Button>
    </Col>
  );
}
