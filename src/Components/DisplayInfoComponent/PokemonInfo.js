import './PokemonInfo.css';
import { Button, Col, Container, Dropdown, Row, Toast } from 'react-bootstrap';
import favBall from '../../assets/favBall.png'
import { GetPokemonData, GetPokemonLocation, GetPokemonUrl } from '../DataService';
import { useEffect, useState } from 'react';
import { saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage } from '../localStorage';
import DisplayEvolutionChain from './DisplayEvolutionChain';
import ToastComponent from './ToastComponent';

export default function PokemonInfo() {
  const [input, setInput] = useState('1');
  const [pokemon, setPokemon] = useState('');
  const [pokeMoves, setPokeMoves] = useState('');
  const [pokeAbilities, setPokeAbilities] = useState('');
  const [pokeFoundCity, setPokeCity] = useState('');
  const [pokeId, setPokeId] = useState(1);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [pokeType, setPokeType] = useState([]);
  const [pokeFav, setPokeFav] = useState([]);

  const GetData = async (typed) => {
    let info = await GetPokemonData(typed);
    let location = await GetPokemonLocation(typed);
    let evolution = await GetPokemonUrl(typed);

    let fullEvolutionChain = [];
    const traverseEvolutionChain = (chain) => {
      let id = chain.species.url.split('/')[6];
      let species = chain.species.name;
      let evolvesTo = chain.evolves_to;
      fullEvolutionChain.push({
        species: species,
        id: id
      });

      if (evolvesTo.length > 0) {
        evolvesTo.forEach(evo => {
          traverseEvolutionChain(evo);
        });
      }
    }
    traverseEvolutionChain(evolution);

    setEvolutionChain(fullEvolutionChain);
    PokeMonInfoFunction(info)
    setPokeCity(location.map(area => area.location_area.name).splice(0, 10).join(', '));
  }

  const PokeMonInfoFunction = (pokemonInfo) => {
    setPokeId(pokemonInfo.id);
    setPokeType(pokemonInfo.types.map(type => type.type.name));
    setPokemon(pokemonInfo.name);
    setPokeMoves(pokemonInfo.moves.map(move => move.move.name.charAt(0).toUpperCase() + move.move.name.slice(1)).join(', '));
    setPokeAbilities(pokemonInfo.abilities.map(ability => ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)).join(', '));
  }

  useEffect(() => {
    GetData(input)
    setPokeFav(getLocalStorage());
  }, [input]);

  const handlePokemon = (e) => {
    if (e.key === 'Enter') {
      GetData(e.target.value)
    }
  }

  const rndBtn = () => {
    let rnd = Math.floor(Math.random() * 649) + 1;
    setInput(rnd);
    GetData(rnd);
  }


  const [showMore, setShowMore] = useState(false);
  const text = pokeFoundCity;
  const maxLength = 50;

  const displayText = showMore ? text : text.substring(0, maxLength);

  const save = (pokemon) => {
    saveToLocalStorageByName(pokemon);
    setPokeFav(getLocalStorage());
    toggleShowA()
  }
  const removePoke = (pokemon) => {
    removeFromLocalStorage(pokemon);
    setPokeFav(getLocalStorage());
  }
  const searchFavPokemon = (favorite) => {
    GetData(favorite);
  }

  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);

  return (
    <>
      <ToastComponent pokemonName={pokemon} toggleShowA={toggleShowA} showA={showA} />
      <Container fluid>
        <Row>
          <Col className='d-flex flex-column align-items-center'>
            <Row className='pokemonFav'>
              <div className='favBar d-flex justify-content-center align-items-center'>
                <h1>Favorites</h1>
                <Button variant=''><img src={favBall} className='favImg' /></Button>
              </div>
              <div className='favTop'>
                {pokeFav.map((fav, idx) => {
                  return (
                    <Row key={idx} className='d-flex align-items-center favTxt'>
                      <Col>
                        <Button onClick={() => searchFavPokemon(fav)} className='favBtn' variant=''>{fav}</Button>
                      </Col>
                      <Col className='d-flex align-items-center justify-content-end'>
                        <Button onClick={() => removePoke(fav)} variant='' className='remove'>Remove</Button>
                      </Col>
                    </Row>
                  )
                })}
              </div>
            </Row>
            <Row className='d-flex align-items-center'>
              <Button onClick={() => save(pokemon)} variant='' className='images'>
                <img alt='API is not up to date for these images' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokeId}.png`} />
              </Button>
              <Button onClick={() => save(pokemon)} variant='' className='images'>
                <img alt='API is not up to date for these images' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokeId}.png`} />
              </Button>
            </Row>
          </Col>
          <Col style={{ marginTop: '4rem' }}>
            <Row className='d-flex justify-content-center'>
              <input onChange={(event) => setInput(event.target.value)} onKeyDown={handlePokemon} value={input} className='input' placeholder='Enter id or name of pokemon' />
            </Row>
            <Row className='d-flex justify-content-center'>
              <div className='pokemonInfo'>
                <Button onClick={rndBtn} className='generateBtn' variant=''>Generate random Pokemon between Gens 1-5</Button>
                <h1 className='pokeName'>{pokemon}, Id: {pokeId}</h1>
                <div>
                  <p>Found in: {displayText === '' ? 'Not found in any known city' : displayText}</p>
                  {text.length > maxLength && (
                    <Button variant='' className='seeBtn' onClick={() => setShowMore(!showMore)}>{showMore ? "See less" : "See more"}</Button>
                  )}
                </div>
                <Row>
                  <Col className='d-flex justify-content-center'>
                    <Dropdown>
                      <Dropdown.Toggle className='dropdownBtn' variant="" id="dropdown-moves">
                        Moves
                      </Dropdown.Toggle>
                      <Dropdown.Menu className='movesList'>
                        {pokeMoves}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col className='d-flex justify-content-center'>
                    <Dropdown>
                      <Dropdown.Toggle className='dropdownBtn' variant="" id="dropdown-abilities">
                        Abilities
                      </Dropdown.Toggle>
                      <Dropdown.Menu className='abilities'>
                        {pokeAbilities}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
                <Row className='d-flex justify-content-center'>
                  <DisplayEvolutionChain
                    evoChain={evolutionChain}
                    searchFavPokemon={searchFavPokemon}
                  />
                </Row>
                <Row className='d-flex justify-content-center'>
                  {pokeType.map(type => {
                    return (
                      <Col key={type} lg={6} className={`d-flex justify-content-center ${type}Type`}>
                        <h1>{type}</h1>
                      </Col>
                    )
                  })}
                </Row>
              </div>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}
