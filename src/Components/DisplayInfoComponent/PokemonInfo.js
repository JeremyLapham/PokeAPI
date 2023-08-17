import './PokemonInfo.css';
import { Button, Col, Container, Dropdown, Row, Toast } from 'react-bootstrap';
import favBall from '../../assets/favBall.png'
import { GetPokemonData, GetPokemonLocation, GetPokemonUrl } from '../DataService';
import { useEffect, useState } from 'react';
import { saveToLocalStorageByName, getLocalStorage, removeFromLocalStorage } from '../localStorage';
import DisplayEvolutionChain from './DisplayEvolutionChain';
import ToastComponent from './ToastComponent';

export default function PokemonInfo() {
  const [pokemon, setPokemon] = useState([]);
  const number = 1000;

  async function getListOfPokemon() {
    const newPokemon = [];
    for (let i = 1; i <= number; i++) {
      let data = await GetPokemonData(i);
      newPokemon.push(data);
    }
    setPokemon(newPokemon);
  }

  useEffect(() => {
    getListOfPokemon();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 style={{ fontSize: 45 }}>Pokemon List</h1>
        </Col>
      </Row>
      <Row className='boxOfPokemon'>
        {pokemon.map((data) => (
          <Col lg={12} key={data.name}>
            <h1>{data.name}</h1>
            </Col>
        ))}
      </Row>
    </Container>
  )
}
