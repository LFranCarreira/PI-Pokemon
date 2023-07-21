const newPokemonFromApi = (array) => 
  array.map((pk) => { 
    return{
    id: pk.id,
    name: pk.name,
    image: pk.sprites.other.dream_world.front_default,
    health: pk.stats[0].base_stat,
    attack: pk.stats[1].base_stat,
    defense: pk.stats[2].base_stat,
    speed: pk.stats[5].base_stat,
    height: pk.height,
    weight: pk.weight,
    types: pk.types? pokemon.types.map((e) => e.type.name).flat().sort().join(', '): undefined,
    createdInDb: false,
  };
})


module.exports = {newPokemonFromApi};