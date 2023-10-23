import React from "react";
import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { SaveSortTypeToLocalStorage } from "./localStorage";

export default function Favorites({ pokemon, uppercase, data, closeNav }) {
  const sortValue = localStorage.getItem('SortValue');
  const [sortType, setSortType] = useState(sortValue);

  const switchValue = () => {
    switch (sortType) {
      case '1':
        pokemon.sort((a, b) => a.pokeName.localeCompare(b.pokeName));
        break;
      case '2':
        pokemon.sort((a, b) => b.pokeName.localeCompare(a.pokeName));
        break;
      case '3':
        pokemon.sort((a, b) => a.pokeId - b.pokeId);
        break;
      case '4':
        pokemon.sort((a, b) => b.pokeId - a.pokeId);
        break;
    }
  };

  switchValue()

  function LowerCaseAndSplit(word, splitOn = "-", joinWith = " ") {
    return word
      .split(splitOn)
      .map((word) => word[0].toLowerCase() + word.slice(1))
      .join(joinWith);
  }

  return (
    <>
      <Row>
        <Col>
          <Form.Select
            value={sortType}
            onChange={(e) => {setSortType(e.target.value);
              SaveSortTypeToLocalStorage(e.target.value)}}
            aria-label="Select dropdown for sorting your favorite pokemon"
          >
            <option hidden>Sort Favorites List By:</option>
            <option value="1">Alphabetical A-Z</option>
            <option value="2">Alphabetical Z-A</option>
            <option value="3">Pokemon Id Ascending</option>
            <option value="4">Pokemon Id Descending</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col lg={12} onClick={() => closeNav()}>
          {pokemon?.map((poke) => (
            <Row
              key={poke.pokeName}
              className="align-items-center favList"
              onClick={() => data(LowerCaseAndSplit(poke.pokeName))}
            >
              <Col lg={6}>
                <h3 style={{ cursor: "pointer" }}>
                  {uppercase(poke.pokeName)}
                </h3>
              </Col>
              <Col lg={6} className="d-flex justify-content-end">
                <img
                  className="favImg"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${poke.pokeId}.gif`}
                  alt={"API is not up to date for these images"}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.pokeId}.png`;
                  }}
                />
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </>
  );
}
