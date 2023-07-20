const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const STATUS_OK=200
const STATUS_ERROR=404
const {Pokemons,Type}=require("../db");
const { Op } = require("sequelize");

const getPokemonByName=async function(req,res){
  // const {pokemonName}=req.query.toLowerCase()
  // const pokemonsDB=await Pokemons.findAll({
  //   where: { name : {[Op.iLike]:pokemonName}},
  //   include: {
  //     model: Type,
  //     attributes:["name"],
  //     through:{
  //       as:"types",
  //     }
  //   }
  // })
  // const pokemonInDB = pokemonsDB.map(pk => ({...pk.toJSON(), 
  //   types:pokemon.types.map(type => type.name).flat().sort().join(', ')    
  // }));
  // const pk = await axios.get(`${URL}/${pokemonName}`);
  // const { id, name,sprites, stats, height, weight } = pk.data;
  // const image = sprites.other.home.front_default;
  // const health = getStatValue(stats, "hp");
  // const attack = getStatValue(stats, "attack");
  // const defense = getStatValue(stats, "defense");
  // const speed = getStatValue(stats, "speed");
  // const pokemon = {id,name,image,health,attack,defense,speed,height,weight};
  // if(!pokemonInDB.length && !pokemon.length)throw new Error( `The Pokemon with the name ${pokemonName} doesn't exists`  )
  // return[...pokemonInDB,...pokemon]
}



module.exports = {getPokemonByName};