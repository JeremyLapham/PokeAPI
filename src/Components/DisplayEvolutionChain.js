import React from "react";
import { Button, Col, Row } from "react-bootstrap";

export default function DisplayEvolutionChain({ evoChain, evoClick }) {
  return (
    <>
      {evoChain?.map((evoChain) => {
        return (
          <Col
            style={{ height: 90 }}
            className="d-flex justify-content-evenly"
            key={evoChain.id}
          >
            <Button
              style={{ border: "none", cursor: "pointer" }}
              variant=""
              onClick={() => evoClick(evoChain.id)}
            >
              <img
                className="evoBtn"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${evoChain?.id}.gif`}
                alt={"API is not up to date for these images"}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evoChain.id}.png`;
                }}
              />
              <h5>{evoChain.name}</h5>
            </Button>
          </Col>
        );
      })}
    </>
  );
}
