import React from 'react'
import pokeBall from "../assets/pokeball.png";
import { Col } from 'react-bootstrap';

export default function Loading() {
  return (
    <Col className='d-flex justify-content-center pokeLoad'>
        <img className='pokeLoad' src={pokeBall} />
    </Col>
  )
}
