import './PokemonInfo.css';
import { Button, Col, Container, Dropdown, Row } from 'react-bootstrap';
import favBall from '../../assets/favBall.png'
import { GetPokemonData, GetPokemonLocation } from '../DataService';

export default function PokemonInfo() {
  const GetData = async() => {
    let info = await GetPokemonData();
    let location = await GetPokemonLocation();
    console.log(info)
    console.log(location)
    // info.moves.map(move => {
    //   console.log(move.move.name);
    // })
    // info.abilities.map(ability => {
    //   console.log(ability.ability.name);
    // })
    // info.types.map(type => {
    //   console.log(type.type.name);
    // })
    // console.log(info.name)
  }
  GetData()
  return (
    <Container fluid>
      <Row>
        <Col className='d-flex justify-content-center'>
          <div className='pokemonFav'>
            <div className='favBar d-flex justify-content-center align-items-center'>
              <h1>Favorites</h1>
              <Button variant=''><img src={favBall} className='favImg' /></Button>
              <h2>Id:</h2>
            </div>
          </div>
        </Col>
        <Col style={{ marginTop: '3rem' }}>
          <Row className='d-flex justify-content-center'>
            <input className='input' placeholder='Enter id or name of pokemon' />
          </Row>
          <Row className='d-flex justify-content-center'>
            <div className='pokemonInfo'>
              <Button className='generateBtn' variant=''>Generate random Pokemon between Gens 1-5</Button>
              <h1>POKEMON NAME</h1>
              <h2>Found In: CITY NAME</h2>
              <Dropdown>
                <Dropdown.Toggle className='dropdownBtn' variant="" id="dropdown-basic">
                  Dropdown Button
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
