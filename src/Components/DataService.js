let PokeData = '';
export async function GetPokemonData(pokemon) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    const data = await response.json();
    return data;
}

export async function GetAllPokemon(limit) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
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
    const response2 = await fetch(data1.evolution_chain?.url);
    const data2 = await response2.json();

    PokeData = data2;
    let pokemonEvo1 = [];

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function createPokemonObject(species) {
        return {
            name: capitalizeFirstLetter(species.name),
            id: species?.url.split('/').filter(part => part !== '').pop()
        };
    }

    if (PokeData.chain.evolves_to.length === 0) {
        pokemonEvo1.push(createPokemonObject(PokeData.chain.species));
    } else if (PokeData.chain.evolves_to[0].evolves_to.length > 0) {
        let pokeArray = [];
        PokeData.chain.evolves_to.forEach(e => pokeArray.push(e.evolves_to[0].species));
        pokemonEvo1.push(createPokemonObject(PokeData.chain.species));
        PokeData.chain.evolves_to.forEach(e => pokemonEvo1.push(createPokemonObject(e.species)));
        pokeArray.forEach(p => pokemonEvo1.push(createPokemonObject(p)));
    } else {
        if (PokeData.chain.evolves_to[0].evolves_to.length <= 0) {
            pokemonEvo1.push(createPokemonObject(PokeData.chain.species));
            PokeData.chain.evolves_to.forEach(e => pokemonEvo1.push(createPokemonObject(e.species)));
        }
    }

    return pokemonEvo1
}