const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const {Pokemons,Type}=require("./../db");
const { filterPokemonApi, filterPokemonDB } = require("./getAllPokemons");


const getPokemonById = async (id) => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  if (typeof id === "string" && uuidRegex.test(id)) {
    const result = await Pokemons.findOne({
      where: { ID: id },
      include: [
        {
          model: Type,
          attributes: ["Name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (result === null)
      throw new Error(`Pokemon with ID ${id} not found`);
    return filterPokemonDB(result.dataValues);
  } else {
    try {
      const response = await axios.get(`${URL}/${id}`);
      const pokemon = response.data;
      return filterPokemonApi(pokemon, "Detail");
    } catch (error) {
      throw new Error(`Pokemon with ID ${id} not found`);
    }
  }
};
module.exports={getPokemonById}