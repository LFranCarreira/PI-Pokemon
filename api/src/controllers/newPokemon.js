const {Pokemons,Types}=require("../db");

const newPokemon = async (pokemonData)=>{
  const { name, image, health, attack, defense, speed, height, weight, types } = pokemonData
  const existingTypes = await Types.findAll({
    where: {
      name: types,
    },
  });

  // Verificar si todos los tipos proporcionados existen en la tabla 'Types'
  if (existingTypes.length !== types.length) {
    const nonExistentTypes = types.filter((type) => !existingTypes.some((existingType) => existingType.name === type));
    throw new Error(`The following types do not exist: ${nonExistentTypes.join(", ")}`);
  }
  const newPokemon = await Pokemons.create({
    name,
    image,
    health,
    attack,
    defense,
    speed,
    height,
    weight,
  });

    for (const type of existingTypes) {
      await newPokemon.addType(type);
    }

  return newPokemon;
};

module.exports = {newPokemon};