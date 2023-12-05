import "../Styles/PokemonInfo.css";
import {
  Button,
  Col,
  Container,
  Navbar,
  Offcanvas,
  Row,
} from "react-bootstrap";
import {
  GetPokemonData,
  GetPokemonLocation,
  GetPokemonUrl,
  GetAllPokemon,
} from "../Services/DataService";
import { useEffect, useState } from "react";
import {
  saveToLocalStorageByName,
  getLocalStorage,
  removeFromLocalStorage,
} from "./localStorage";
import DisplayEvolutionChain from "./DisplayEvolutionChain";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Favorites from "./favorites";
import PokeInfo from "./pokeInfo";
import ActionBtns from "./ActionBtns";
import Loading from "./Loading";
import Nav from "./Nav";

export default function PokemonInfo() {
  const localStorageItems = getLocalStorage();
  const imageUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("1");
  const [pokeName, setPokeName] = useState("");
  const [pokeId, setPokeId] = useState(1);
  const [pokeLocation, setPokeLocation] = useState([]);
  const [pokeMoves, setPokeMoves] = useState();
  const [pokeAbilities, setPokeAbilities] = useState();
  const [evoChain, setEvoChain] = useState();
  const [pokeType, setPokeType] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      let evolution = await GetPokemonUrl(input);
      const data = await GetPokemonData(input);
      const locations = await GetPokemonLocation(input);

      setPokeLocation(
        locations.map((area) => UpperCaseAndSplit(area.location_area.name))[0]
      );
      setEvoChain(evolution);
      setAllData(data);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
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

  const filterPokemon = (e) => {
    const filteredSuggestions = pokemon.filter((pokemon) =>
      pokemon.toLowerCase().startsWith(e.target.value)
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    filterPokemon(e);
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
      setSuggestions(pokemon);
    }, 150);
  };

  const handleSuggestionClick = (suggestion) => {
    getPokeMonData(suggestion);
    setSearch("");
  };

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
            <Nav
              localstorage={localStorageItems}
              UpperCaseAndSplit={UpperCaseAndSplit}
              getPokeMonData={getPokeMonData}
              closeOffcanvas={closeOffcanvas}
              showOffcanvas={showOffcanvas}
            />
            <div>
              <Row>
                <Col
                  lg={6}
                  md={12}
                  className="d-flex justify-content-space-between"
                >
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
                <ActionBtns
                  text={"Search"}
                  clickFunction={handleClick}
                  className={"searchPokemonBtn"}
                />
                <ActionBtns
                  text={"Random"}
                  clickFunction={rndNumber}
                  className={"secondaryPokeBtn"}
                />
                <ActionBtns
                  text={"Favorites"}
                  clickFunction={openOffcanvas}
                  className={"secondaryPokeBtn"}
                />
              </Row>
              <Row>
                <Col className="d-flex align-items-center mt-3">
                  <Button
                    onClick={() => getPokeMonData(pokeId - 1)}
                    variant=""
                    className="arrowPoke"
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
              {!isLoading ? 
              <>
              <Row className="align-items-center">
                <Col className="d-flex justify-content-start align-items-center">
                <h1 className="ms-3">Id: {pokeId}</h1>
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
                      <AiFillHeart color="red" size={40} />
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
                      <AiOutlineHeart color="red" size={40} />
                    </Button>
                  )}
                </Col>
              </Row>
              <Row className="d-flex align-items-center mt-5">
                <Col xl={6} lg={12} md={12}>
                  <Row className="justify-content-center">
                    {<>
                        <Col>
                          <img
                            className="images"
                            alt="API is not up to date for these images"
                            src={`${imageUrl}shiny/${pokeId}.png`}
                          />
                        </Col>
                        <Col>
                          <img
                            className="images"
                            alt="API is not up to date for these images"
                            src={`${imageUrl}${pokeId}.png`}
                            />
                        </Col>
                      </>}
                  </Row>
                </Col>
                <Col xl={6} lg={12} md={12}>
                  <PokeInfo
                    pokeLocation={pokeLocation}
                    pokeMoves={pokeMoves}
                    pokeAbilities={pokeAbilities}
                    pokeType={pokeType}
                    UpperCaseAndSplit={UpperCaseAndSplit}
                    isLoading={isLoading}
                    />
                </Col>
              </Row>
            <Row className="justify-content-center mb-5 ms-0">
              <DisplayEvolutionChain
                evoChain={evoChain}
                evoClick={getPokeMonData}
                />
            </Row>
              </>
              :
                <>
                  <Loading customClass={"pokeLoad"} />
                </>
            }
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
