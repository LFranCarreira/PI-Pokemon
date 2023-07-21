const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const {Pokemons,Types}=require("./../db")


const getPokemonByIdApi = async (idPokemon) => {
  try{  
    const pk = await axios.get(`${URL}/${idPokemon}`);
    const { id, name, sprites, stats, height, weight } = pk.data;
    const image = sprites.other.dream_world.front_default;
    const health = stats[0].base_stat
    const attack = stats[1].base_stat
    const defense = stats[2].base_stat
    const speed = stats[5].base_stat
    const types= pk.data.types.map((type) => type.type.name)
    const pokemon = {id,name,image,health,attack,defense,speed,height,weight,types};
    return pokemon
  }catch(error){
    return null
  }
}

const getPokemonByIdDB=async (idPokemon)=>{
  try{  
    const pokemon = await Pokemons.findOne({
    where: { id: idPokemon },
    include: {
      model: Types,
      attributes: ["name"],
      through: { attributes: [] }
    }
  });
  return pokemon;
  }catch(error){
    return null
  }
}
module.exports={getPokemonByIdApi,getPokemonByIdDB}