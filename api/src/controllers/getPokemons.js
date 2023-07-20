const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const STATUS_OK=200
const STATUS_ERROR=404

const getPokemons=async function(req,res){
  try {
    const pokemons = await axios.get(`${URL}`);
    res.status(STATUS_OK).json(pokemons.data);
  } catch (error) {
    res.status(STATUS_ERROR).end(error.message);
  }
}
module.exports={getPokemons}

