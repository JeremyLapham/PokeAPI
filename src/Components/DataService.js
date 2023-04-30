

export async function GetPokemonData(pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();
    return data;
}

export async function GetPokemonLocation(pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/encounters`);
    const data = await response.json();
    return data;
}

export async function GetPokemonUrl(pokemon) {
    const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const data1 = await response1.json();
    const evoChain = data1.evolution_chain.url;

    const response2 = await fetch(evoChain);
    const data2 = await response2.json();
    const evolutionChain = data2.chain;
    return evolutionChain;
}