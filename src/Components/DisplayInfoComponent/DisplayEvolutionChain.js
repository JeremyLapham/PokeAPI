import React from 'react'
import { Button, Col } from 'react-bootstrap';

export default function DisplayEvolutionChain({evoChain, searchFavPokemon}) {
    return (
        <>
            {evoChain?.map(evoChain => {
                const notShiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${evoChain.id}.png`;
                const shiny = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${evoChain.id}.png`;
                return (
                    <Col className='d-flex flex-column align-items-center' lg={4} md={4} sm={4} xs={4} key={evoChain.id}>
                        <Button variant='' onClick={() => searchFavPokemon(evoChain.species)}>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${evoChain.id}.png`}
                                onMouseOver={(e) => { e.currentTarget.src = shiny }}
                                onMouseOut={(e) => { e.currentTarget.src = notShiny; }} alt={'API is not up to date for these images'} width="100" />
                            <span>{evoChain.species}</span>
                        </Button>
                    </Col>
                )
            })}
        </>
    )
}
