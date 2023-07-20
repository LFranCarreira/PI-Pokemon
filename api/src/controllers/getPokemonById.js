const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const STATUS_OK=200
const STATUS_ERROR=404
const {Pokemons,Type}=require("./../db")


const getPokemonById = async function(req, res) {
    const { idPokemon } = req.params;
    
    try {
      const pk = await axios.get(`${URL}/${idPokemon}`);
      const { id, name, sprites, stats, height, weight } = pk.data;
      const image = sprites.other.dream_world.front_default;
      const health = stats[0].base_stat
      const attack = stats[1].base_stat
      const defense = stats[2].base_stat
      const speed = stats[5].base_stat
  
      const pokemon = {id,name,image,health,attack,defense,speed,height,weight};
  
      res.status(STATUS_OK).json(pokemon);
    
    } catch (error) {
      res.status(STATUS_ERROR).json({ message:error.message });
    }
  };
module.exports={getPokemonById}