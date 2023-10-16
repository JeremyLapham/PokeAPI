import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import IconObject from "./PokemonObjects/PokemonIconObject";

export default function PokeInfo({
  pokeLocation,
  pokeMoves,
  pokeAbilities,
  pokeType,
  UpperCaseAndSplit,
}) {
  return (
    <Container>
      <Row>
        <Col>
          <Row className="infoWidth d-flex mb-3">
            <h3 className="shortCol">Location:</h3>
            <h3 className="longCol">
              {pokeLocation ? pokeLocation : "Not Found"}
            </h3>
          </Row>
          <Row className="infoWidth d-flex mb-3">
            <h3 className="shortCol">Moves:</h3>
            <h3 className="pokeMovesScrollBox longCol">{pokeMoves}</h3>
          </Row>
          <Row className="infoWidth d-flex mb-3">
            <h3 className="shortCol">Abilities:</h3>
            <h3 className="longCol">{pokeAbilities}</h3>
          </Row>
          <Row className="infoWidth d-flex align-items-center">
            <h3 className="shortCol">
              {pokeType.length > 1 ? "Types:" : "Type"}
            </h3>
            <div className="longCol d-flex">
              {pokeType.map((type) => {
                let iconInfo = IconObject[`${type}`];
                return (
                  <Col key={type} xl={6} lg={6}>
                    <div
                      style={{
                        backgroundColor: `${iconInfo.color}`,
                        color: `${iconInfo?.text}`,
                      }}
                      className={`d-flex typeBlock align-items-center`}
                    >
                      <img className="typeIcon mr-2" src={iconInfo.image} />
                      <h4>{UpperCaseAndSplit(type)}</h4>
                    </div>
                  </Col>
                );
              })}
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
