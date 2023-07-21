const { Op } = require("sequelize");
const {Pokemons,Type}=require("../db")

const newPokemon = async (pokemonData)=>{
  const { name, image, health, attack, defense, speed, height, weight, types } = pokemonData
  const typesFound=await Type.findAll({
    where:{
      name:{
        [Op.in]:types
      }
    }
  })
  const newPk = await Pokemons.create({name,image,health,attack,defense,speed,height,weight,types});

return await newPk.addTypes(typesFound)
};

module.exports = {newPokemon};