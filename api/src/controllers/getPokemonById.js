const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon';
const { Pokemons, Type } = require('./../db');
const { filterPokemonApi, filterPokemonDB } = require('./getAllPokemons');

const getPokemonById = async (id) => {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  //regex to know if the id should be search in the DB or API
  if (typeof id === 'string' && uuidRegex.test(id)) {
    //if it is from the DB, we search in there and get it back, if the search is from an uuid but it is not in the DB, it catches on an error
    const result = await Pokemons.findOne({
      where: { ID: id },
      include: [
        {
          model: Type,
          attributes: ['Name'],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (result === null) throw new Error(`Pokemon with ID ${id} not found`);
    //returns the pokemon with the filter and the data values
    return filterPokemonDB(result.dataValues);
  } else {
    try {
      //if the id is not an uuid, we search on the api and get it back
      const response = await axios.get(`${URL}/${id}`);
      const pokemon = response.data;
      return filterPokemonApi(pokemon);
    } catch (error) {
      throw new Error(`Pokemon with ID ${id} not found`);
    }
  }
};
module.exports = { getPokemonById };
