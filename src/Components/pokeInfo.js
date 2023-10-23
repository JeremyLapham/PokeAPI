import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import IconObject from "./PokemonObjects/PokemonIconObject";

export default function PokeInfo({
  pokeLocation,
  pokeMoves,
  pokeAbilities,
  pokeType,
  UpperCaseAndSplit,
  isLoading,
}) {
  return (
    <Container>
      <Row>
        <Col>
          <Row className="infoWidth d-flex mb-3">
            <h3 className="shortCol">Location:</h3>
            <h3 className="longCol">
              {!isLoading ? (
                pokeLocation ? (
                  pokeLocation
                ) : (
                  "Not Found"
                )
              ) : (
                <div style={{ position: "relative" }}>
                  <div className="runningAnimation"></div>
                </div>
              )}
            </h3>
          </Row>
          <Row className="infoWidth d-flex mb-3">
            <h3 className="shortCol">Moves:</h3>
            <h3 className="pokeMovesScrollBox longCol">
              {!isLoading ? pokeMoves : ""}
            </h3>
          </Row>
          <Row className="infoWidth d-flex mb-3">
            <h3 className="shortCol">Abilities:</h3>
            <h3 className="longCol">{!isLoading ? pokeAbilities : ""}</h3>
          </Row>
          <Row className="infoWidth d-flex align-items-center">
            <h3 className="shortCol">
              {pokeType.length > 1 ? "Types:" : "Type"}
            </h3>
            <div className="longCol d-flex flex-column">
              {!isLoading
                ? pokeType.map((type) => {
                    let iconInfo = IconObject[`${type}`];
                    return (
                      <Col key={type} xl={6} lg={6} className="mb-3">
                        <div
                          style={{
                            backgroundColor: `${iconInfo.color}`,
                            color: `${iconInfo?.text}`,
                          }}
                          className={`d-flex align-items-center typeBlock`}
                        >
                          <img className="typeIcon mr-2" src={iconInfo.image} />
                          <h4>{UpperCaseAndSplit(type)}</h4>
                        </div>
                      </Col>
                    );
                  })
                : ""}
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
