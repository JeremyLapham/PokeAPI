import "../../Styles/PokemonInfo.css";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Nav,
  Navbar,
  Offcanvas,
  Row,
  Spinner,
  Toast,
} from "react-bootstrap";
import {
  GetPokemonData,
  GetPokemonLocation,
  GetPokemonUrl,
  GetAllPokemon,
} from "../../Services/DataService";
import { useEffect, useState } from "react";
import {
  saveToLocalStorageByName,
  getLocalStorage,
  removeFromLocalStorage,
} from "../localStorage";
import DisplayEvolutionChain from "./DisplayEvolutionChain";
import IconObject from "../PokemonObjects/PokemonIconObject";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Favorites from "../favorites";

export default function PokemonInfo() {
  const localStorageItems = getLocalStorage();
  const imageUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("1");
  const [pokeName, setPokeName] = useState("");
  const [pokeId, setPokeId] = useState(0);
  const [pokeLocation, setPokeLocation] = useState([]);
  const [pokeMoves, setPokeMoves] = useState();
  const [pokeAbilities, setPokeAbilities] = useState();
  const [evoChain, setEvoChain] = useState();
  const [pokeType, setPokeType] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    getListOfPokemon();
  }, []);

  useEffect(() => {
    getPokeMonData(search);
  }, []);

  function UpperCaseAndSplit(word, splitOn = "-", joinWith = " ") {
    return word
      .split(splitOn)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(joinWith);
  }

  function rndNumber() {
    let rndNum = Math.floor(Math.random() * 919) + 1;
    getPokeMonData(rndNum);
    setSearch("");
  }

  async function getPokeMonData(input) {
    let evolution = await GetPokemonUrl(input);
    const data = await GetPokemonData(input);
    const locations = await GetPokemonLocation(input);

    setPokeLocation(
      locations.map((area) => UpperCaseAndSplit(area.location_area.name))[0]
    );
    setEvoChain(evolution);
    setAllData(data);
  }

  function setAllData(data) {
    GetPokemonUrl(data.id);
    setPokeId(data.id);
    setPokeMoves(
      data.moves.map((data) => UpperCaseAndSplit(data.move.name)).join(", ")
    );
    setPokeAbilities(
      data.abilities
        .map((ability) => UpperCaseAndSplit(ability.ability.name))
        .join(", ")
    );
    setPokeName(UpperCaseAndSplit(data.name));
    setPokeType(data.types.map((type) => type.type.name));
  }

  async function getListOfPokemon() {
    const limit = 920;
    const newPokemon = [];
    const data = await GetAllPokemon(limit);

    data.results.forEach((pokemon) => newPokemon.push(pokemon.name));
    setPokemon(newPokemon);
  }

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    const filteredSuggestions = pokemon.filter((pokemon) =>
      pokemon.toLowerCase().startsWith(e.target.value)
    );
    setSuggestions(filteredSuggestions);
  };

  const handleClick = () => {
    getPokeMonData(search);
    setSearch("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getPokeMonData(search);
      setSearch("");
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsInputFocused(false);
    }, 150);
  };

  const handleSuggestionClick = (suggestion) => {
    getPokeMonData(suggestion);
    setSearch("");
  };

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const openOffcanvas = () => {
    setShowOffcanvas(true);
  };

  const closeOffcanvas = () => {
    setShowOffcanvas(false);
  };

  return (
    <Container fluid>
      <Row>
        <Col lg={12}>
          <Row className="displayPokeInfo">
            <div>
              <Row>
                <>
                  <Navbar expand={false}>
                    <Container fluid>
                      <Navbar.Offcanvas
                        className={`offcanvas ${
                          showOffcanvas ? "show" : ""
                        } boxOfPokemon`}
                        placement="end"
                        onHide={closeOffcanvas}
                      >
                        <Offcanvas.Header closeButton onClick={closeOffcanvas}>
                          <h1>Favorites</h1>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                          <Favorites
                            pokemon={localStorageItems}
                            uppercase={UpperCaseAndSplit}
                            data={getPokeMonData}
                            closeNav={closeOffcanvas}
                          />
                        </Offcanvas.Body>
                      </Navbar.Offcanvas>
                    </Container>
                  </Navbar>
                </>
                <Col lg={6} md={12} className="d-flex justify-content-space-between">
                  <div className="inputBox">
                    <input
                      onKeyDown={handleKeyPress}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      onChange={(e) => handleSearch(e)}
                      placeholder="Enter a pokemon name or id"
                      value={search}
                      options={suggestions}
                    />
                    {isInputFocused && (
                      <div className="autoList">
                        {suggestions.map((suggestion) => (
                          <Button
                            key={suggestion}
                            onClick={() => handleSuggestionClick(suggestion)}
                            variant=""
                            className="listItem"
                          >
                            <h4>{suggestion}</h4>
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </Col>
                <Col lg={2} md={6} sm={12} className="d-flex justify-content-center">
                  <Button
                    variant=""
                    className="searchPokemonBtn"
                    onClick={handleClick}
                  >
                    Search
                  </Button>
                </Col>
                <Col lg={2} md={6} sm={12} className="d-flex justify-content-center">
                  <Button
                    variant=""
                    className="searchPokemonBtn"
                    onClick={rndNumber}
                  >
                    Random
                  </Button>
                </Col>
                <Col lg={2} md={12} sm={12} className="d-flex justify-content-center">
                  <Button
                    variant=""
                    className="searchPokemonBtn"
                    onClick={openOffcanvas}
                  >
                    Favorites
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex align-items-center mt-3">
                  <Button
                    onClick={() => getPokeMonData(pokeId - 1)}
                    variant=""
                    className="mr-3 arrowPoke"
                  >
                    <BsArrowLeft size={40} />
                  </Button>
                  <Button
                    onClick={() => getPokeMonData(pokeId + 1)}
                    variant=""
                    className="arrowPoke"
                  >
                    <BsArrowRight size={40} />
                  </Button>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col className="d-flex justify-content-start align-items-center">
                  <h2 className="ms-3">Id: {pokeId}</h2>
                  <h1 className="ms-3">{pokeName}</h1>
                  {localStorageItems.some(
                    (item) => item.pokeName === pokeName
                  ) ? (
                    <Button
                      variant=""
                      style={{ border: "none" }}
                      onClick={() => {
                        removeFromLocalStorage({ pokeName, pokeId });
                        getListOfPokemon();
                      }}
                    >
                      <AiFillHeart size={40} />
                    </Button>
                  ) : (
                    <Button
                      variant=""
                      style={{ border: "none" }}
                      onClick={() => {
                        saveToLocalStorageByName({ pokeName, pokeId });
                        getListOfPokemon();
                      }}
                    >
                      <AiOutlineHeart size={40} />
                    </Button>
                  )}
                </Col>
              </Row>
              <Row className="d-flex align-items-center mt-5">
                <Col xl={6} lg={12} md={12}>
                  <Row>
                    <Col className="d-flex">
                      <div variant="" className="">
                        <img
                        className='images'
                          alt="API is not up to date for these images"
                          src={`${imageUrl}shiny/${pokeId}.png`}
                        />
                      </div>
                      <div variant="" className="">
                        <img
                        className='images'
                          alt="API is not up to date for these images"
                          src={`${imageUrl}${pokeId}.png`}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col xl={6} lg={12} md={12}>
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
                          <h3 className="pokeMovesScrollBox longCol">
                            {pokeMoves}
                          </h3>
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
                                    <img
                                      className="typeIcon mr-2"
                                      src={iconInfo.image}
                                    />
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
                </Col>
              </Row>
            </div>
            <Row className="justify-content-center">
              <DisplayEvolutionChain
                evoChain={evoChain}
                evoClick={getPokeMonData}
              />
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
