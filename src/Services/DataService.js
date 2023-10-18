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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function createPokemonObject(species) {
    return {
        name: capitalizeFirstLetter(species.name),
        id: species?.url.split('/').filter(part => part !== '').pop()
    };
}

export async function GetPokemonUrl(pokemon) {
    const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const data1 = await response1.json();
    const response2 = await fetch(data1.evolution_chain?.url);
    const data2 = await response2.json();

    let pokemonEvo1 = [];

    if (data2.chain.evolves_to.length === 0) {
        pokemonEvo1.push(createPokemonObject(data2.chain.species));
    } else if (data2.chain.evolves_to[0].evolves_to.length > 0) {
        let pokeArray = data2.chain.evolves_to.map(e => e.evolves_to[0].species);
        pokemonEvo1.push(createPokemonObject(data2.chain.species));
        pokemonEvo1 = [...pokemonEvo1, ...data2.chain.evolves_to.map(e => createPokemonObject(e.species))];
        pokemonEvo1 = [...pokemonEvo1, ...pokeArray.map(p => createPokemonObject(p))];
    } else {
            pokemonEvo1.push(createPokemonObject(data2.chain.species));
            pokemonEvo1 = [...pokemonEvo1, ...data2.chain.evolves_to.map(e => createPokemonObject(e.species))];
        
    }

    return pokemonEvo1;
}