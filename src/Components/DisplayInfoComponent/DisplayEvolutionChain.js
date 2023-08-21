import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';

export default function DisplayEvolutionChain({ evoChain }) {
    return (
        <Row>
            {evoChain?.map(evoChain => {
                return (
                    <Col className='d-flex flex-column align-items-center justify-content-center ml-5 mr-5' lg={2} md={2} sm={2} xs={2} key={evoChain.id}>
                        <div>
                            <Button variant=''>
                                <img className='evoBtn' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${evoChain.id}.gif`} alt={'API is not up to date for these images'} />
                                <h5>{evoChain.name}</h5>
                            </Button>
                        </div>
                    </Col>
                )
            })}
        </Row>
    )
}
