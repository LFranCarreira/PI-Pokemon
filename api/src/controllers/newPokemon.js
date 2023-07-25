const {Pokemons,Type}=require("../db");

const newPokemon = async (pokemonData)=>{
  const { Name, Image, Health, Attack, Defense, Speed, Height, Weight, Types } = pokemonData
  const existingTypes = await Type.findAll({
    where: {
      Name: Types,
    },
  });

  // Verificar si todos los tipos proporcionados existen en la tabla 'Types'
  if (existingTypes.length !== Types.length) {
    const nonExistentTypes = Types.filter((type) => !existingTypes.some((existingType) => existingType.Name === type));
    throw new Error(`The following types do not exist: ${nonExistentTypes.join(", ")}`);
  }
  const newPokemon = await Pokemons.create({
    Name,
    Image,
    Health,
    Attack,
    Defense,
    Speed,
    Height,
    Weight,
  });

    for (const type of existingTypes) {
      await newPokemon.addType(type);
    }

  return newPokemon;
};

module.exports = {newPokemon};