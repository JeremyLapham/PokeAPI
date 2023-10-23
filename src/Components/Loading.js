import React from 'react'
import pokeBall from "../assets/pokeball.png";
import { Col } from 'react-bootstrap';

export default function Loading({ customClass }) {
  return (
    <Col className={`d-flex justify-content-center align-items-center`}>
        <img className={`${customClass}`} src={pokeBall} />
    </Col>
  )
}
