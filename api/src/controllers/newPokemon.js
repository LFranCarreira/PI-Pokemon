const {Pokemons,Type}=require("../db");

const newPokemon = async (pokemonData)=>{
  const { Name, Image, Health, Attack, Defense, Speed, Height, Weight, Types } = pokemonData
  const existingTypes = await Type.findAll({
    where: {
      Name: Types,
    },
  });
  let resultados = await Pokemons.findAll({
    where: {
      Name: Name,
    },
  });
  // Verificar si todos los tipos proporcionados existen en la tabla 'Types'
  if (existingTypes.length !== Types.length) {
    const nonExistentTypes = Types.filter((type) => !existingTypes.some((existingType) => existingType.Name === type));
    throw new Error(`You can not repeat the same type`);
  }

  const url = "https://pokeapi.co/api/v2/pokemon/" + Name;
  await fetch(url)
    .then((response) => response.json())
    .then((pokemon) => {
      resultados = pokemon
    })
      .catch((error) => {
       resultados = error
      });
  if (resultados["id"]) throw new Error("That name belongs to another Pokemon");
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