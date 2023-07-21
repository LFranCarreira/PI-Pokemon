const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const {Pokemons,Type}=require("./../db")


const getPokemonById = async (id) =>{
  if (isNaN(+id)) {
    const pokemonFromDatabase = await Pokemons.findOne({
      where: { id }, include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    })

    if (pokemonFromDatabase) return pokemonFromDatabase;
    throw new Error("Pokemon not found");

  }

  const pokemonData = (await axios.get(`${URL}/${id}`)).data;
  if (pokemonData) {
    const pokemonObject = {
      id: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.sprites.other.dream_world.front_default,
      health: pokemonData.stats[0].base_stat,
      attack: pokemonData.stats[1].base_stat,
      defense: pokemonData.stats[2].base_stat,
      speed: pokemonData.stats[5].base_stat,
      height: pokemonData.height,
      weight: pokemonData.weight,
      types: pokemonData.types.map((type) => type.type.name),
    };
    return pokemonObject;
  };
}
module.exports={getPokemonById}