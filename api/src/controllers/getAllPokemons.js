const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const {Pokemons,Type}=require("../db")

const getPokemonsFromApi=async ()=>{

    const pokemons = await axios.get(`${URL}?limit=100`);
    const apiInfo=pokemons.data.results.map(async(cb)=>{
      const pkData=await axios.get(cb.url);
      return {      
        id: pkData.data.id,
        name: pkData.data.name,
        image: pkData.data.sprites.other.dream_world.front_default,
        health: pkData.data.stats[0].base_stat,
        attack: pkData.data.stats[1].base_stat,
        defense: pkData.data.stats[2].base_stat,
        speed: pkData.data.stats[5].base_stat,
        height: pkData.data.height,
        weight: pkData.data.weight,
        types: pkData.data.types.map((type) => type.types.name),}
    })
    return Promise.all(apiInfo)
}
const getPokemonsFromDB=async ()=>{
  return await Pokemons.findAll({
    include:{
      model: Type,
      attributes:["name"],
      through:{
        attributes: [],
      }
    }
  })
}
module.exports={getPokemonsFromApi,getPokemonsFromDB}