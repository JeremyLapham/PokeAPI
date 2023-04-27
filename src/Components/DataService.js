

export async function GetPokemonData() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/1');
    const data = response.json();
    return data;
}
export async function GetPokemonLocation() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/1/encounters');
    const data = response.json();
    return data;
}