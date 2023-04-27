import { useNavigate } from 'react-router-dom';
import './HomePage.css'
import { Button, Col, Container, Row } from 'react-bootstrap';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Container>
      <Row>
        <Col className='text-center'>
          <h1 className='pokemonTxt'>Poke API</h1>
        </Col>
      </Row>
      <Row>
        <Col className='text-center'>
          <Button onClick={() => navigate('/pokeInfo')} variant='' className='openBtn'>Open</Button>
        </Col>
      </Row>
    </Container>
  )
}
