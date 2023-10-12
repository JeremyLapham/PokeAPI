import React from 'react'
import { Col, Row } from 'react-bootstrap'

export default function Favorites({pokemon, uppercase, data, closeNav}) {

    function LowerCaseAndSplit(word, splitOn = '-', joinWith = ' ') {
        return word.split(splitOn)
          .map(word => word[0].toLowerCase() + word.slice(1))
          .join(joinWith);
      }

    return (
        <Row>
            <Col lg={12}>
                <div>
                    {pokemon?.map(poke => (
                        <Row key={poke.pokeName} className='align-items-center favList'>
                            <Col lg={6} onClick={() => closeNav()}>
                                <h3 onClick={() => data(LowerCaseAndSplit(poke.pokeName))} style={{ cursor: 'pointer' }}>{uppercase(poke.pokeName)}</h3>
                            </Col>
                            <Col lg={6} className='d-flex justify-content-end'>
                                <img className='favImg' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${poke.pokeId}.gif`} alt={'API is not up to date for these images'} />
                            </Col>
                        </Row>
                    )
                    )}
                </div>
            </Col>
        </Row>
    )
}

