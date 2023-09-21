const { Pokemons, Type } = require('../db');

const newPokemon = async (pokemonData) => {
  const { Name, Image, Health, Attack, Defense, Speed, Height, Weight, Types } =
    pokemonData;
  // Recieve the info to create the pokemon
  const existingTypes = await Type.findAll({
    where: {
      Name: Types,
    },
  });
  let results = await Pokemons.findAll({
    where: {
      Name: Name,
    },
  });
  // Verify if the types exists
  if (existingTypes.length !== Types.length) {
    const nonExistentTypes = Types.filter(
      (type) =>
        !existingTypes.some((existingType) => existingType.Name === type)
    );
    throw new Error(`You can not repeat the same type`);
  }

  const url = 'https://pokeapi.co/api/v2/pokemon/' + Name;
  //we try to search the pokemon if it already exists
  await fetch(url)
    .then((response) => response.json())
    .then((pokemon) => {
      results = pokemon;
    })
    .catch((error) => {
      results = error;
    });
  //if the id exists, throw error
  if (results['id']) throw new Error('That name belongs to another Pokemon');
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
  //create the new pokemon

  for (const type of existingTypes) {
    await newPokemon.addType(type);
  }
  //we add the types and return the pokemon
  return newPokemon;
};

module.exports = { newPokemon };
