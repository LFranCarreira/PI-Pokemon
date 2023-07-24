const { Pokemons, Types } = require("../db");
const axios = require("axios");

const getPokemonsByNames = async (name) => {
  const normalizedQuery = name.toLowerCase(); // Convertir a minúsculas

  try {
    // Intentar buscar el Pokémon en la API
    const pokemonData = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${normalizedQuery}`)).data;

    if (pokemonData) {
      return {
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
    }
  } catch (error) {
    // Si ocurre un error al buscar en la API, continuar buscando en la base de datos
    const pokemonDB = await Pokemons.findAll({where:{name:name}})

    if (pokemonDB) {
      return pokemonDB;
    } else {
      throw new Error("No se encontró el Pokémon en la API ni en la base de datos.");
    }
  }

  throw new Error("No se encontró el Pokémon en la API ni en la base de datos.");
};
module.exports = { getPokemonsByNames };
