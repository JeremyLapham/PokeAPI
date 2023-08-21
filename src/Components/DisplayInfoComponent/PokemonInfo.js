import './PokemonInfo.css';
import { Button, Col, Container, Dropdown, Row, Spinner, Toast } from 'react-bootstrap';
import favBall from '../../assets/favBall.png'
import { GetPokemonData, GetPokemonLocation, GetPokemonUrl, GetAllPokemon } from '../DataService';
import { useEffect, useState } from 'react';
import { saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage } from '../localStorage';
import DisplayEvolutionChain from './DisplayEvolutionChain';
import ToastComponent from './ToastComponent';
import IconObject from '../PokemonObjects/PokemonIconObject';

export default function PokemonInfo() {
  const imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState('1');
  const [pokeName, setPokeName] = useState('');
  const [pokeId, setPokeId] = useState(0);
  const [pokeLocation, setPokeLocation] = useState([]);
  const [pokeMoves, setPokeMoves] = useState();
  const [pokeAbilities, setPokeAbilities] = useState();
  const [evoChain, setEvoChain] = useState();
  const [pokeType, setPokeType] = useState([]);

  useEffect(() => {
    getListOfPokemon();
  }, []);

  useEffect(() => {
    getPokeMonData(search);
  }, []);

  function UpperCaseAndSplit(word, splitOn = '-', joinWith = ' ') {
    return word.split(splitOn)
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(joinWith);
  }

  function rndNumber() {

  }


  async function getPokeMonData(input) {
    let evolution = await GetPokemonUrl(input);
    const data = await GetPokemonData(input);
    const locations = await GetPokemonLocation(input);
    setPokeLocation(locations.map(area => UpperCaseAndSplit(area.location_area.name))[0]);
    setEvoChain(evolution)
    setAllData(data);
  }

  function setAllData(data) {
    GetPokemonUrl(data.id)
    setPokeId(data.id);
    setPokeMoves(data.moves.map(data => UpperCaseAndSplit(data.move.name)).join(', '));
    setPokeAbilities(data.abilities.map(ability => UpperCaseAndSplit(ability.ability.name)).join(', '))
    setPokeName(UpperCaseAndSplit(data.name));
    setPokeType(data.types.map(type => type.type.name))
  }

  async function getListOfPokemon() {
    const limit = 920;
    const newPokemon = [];
    const data = await GetAllPokemon(limit);

    data.results.forEach(pokemon => newPokemon.push(pokemon.name))
    setPokemon(newPokemon);
  }

  const handleSearch = (e) => setSearch(e.target.value);

  const handleClick = () => {
    getPokeMonData(search)
  }

  return (
    <Container fluid>
      <Row>
        <Col lg={3}>
          <Row className='boxOfPokemon'>
            {pokemon.map((allPokemon) => (
              <Col lg={12} key={allPokemon}>
                <Row className='d-flex align-items-center'>
                  <Col>
                    <h1>{allPokemon}</h1>
                  </Col>
                  <Col className='d-flex justify-content-end'>
                    <img src={favBall} className='pokeball' />
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </Col>
        <Col lg={9}>
          <Row className='displayPokeInfo'>
            <div>
              <Row>
                <Col lg={8} className='d-flex justify-content-center'>
                  <input onChange={(e) => handleSearch(e)} placeholder='Enter a pokemon name or id' value={search} />
                </Col>
                <Col lg={4} className='d-flex justify-content-start'>
                  <Button variant='' className='searchPokemonBtn' onClick={handleClick}>
                    Search
                  </Button>
                  <Button variant='' className='searchPokemonBtn ml-5' onClick={handleClick}>
                    Random
                  </Button>
                  {/* <Button variant="" className='searchPokemonBtn'>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Loading...
                  </Button> */}
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <h1>{pokeName}</h1>
                </Col>
                <Col lg={8}>
                  <h1>Id: {pokeId}</h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h1>Location: {pokeLocation ? pokeLocation : 'Not Found'}</h1>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex'>
                  <h3 className='mr-5'>Moves: </h3>
                  <h3 className='pokeMovesScrollBox'>{pokeMoves}</h3>
                </Col>
              </Row>
              <Row>
                <Col className='d-flex'>
                  <h3 className='mr-5'>Abilities: </h3>
                  <h3 className='pokeMovesScrollBox'>{pokeAbilities}</h3>
                </Col>
              </Row>
              <Row className='d-flex align-items-center'>
                <Col>
                  <Button variant='' className='images'>
                    <img alt='API is not up to date for these images' src={`${imageUrl}shiny/${pokeId}.png`} />
                  </Button>
                  <Button variant='' className='images'>
                    <img alt='API is not up to date for these images' src={`${imageUrl}${pokeId}.png`} />
                  </Button>
                </Col>
                <Col>
                  <Row>
                    <h3>Types: </h3>
                    {pokeType.map(type => {
                      let iconInfo = IconObject[`${type}`];
                      return (
                        <Col className='d-flex' key={type}>
                          <div style={{ backgroundColor: `${iconInfo.color}` }} className={`d-flex typeBlock`}>
                            <img className='typeIcon mr-2' src={iconInfo.image} />
                            <h3 className={`${iconInfo.color}`}>
                              {UpperCaseAndSplit(type)}
                            </h3>
                          </div>
                        </Col>
                      )
                    })}
                  </Row>
                </Col>
              </Row>
              <Row className='justify-content-center'>
                <DisplayEvolutionChain evoChain={evoChain} />
              </Row>
            </div>
          </Row>
        </Col>
      </Row >
    </Container >
  )
}
