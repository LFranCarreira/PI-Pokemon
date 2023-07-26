const { filterPokemonApi,filterPokemonDB }=require("./getAllPokemons");
const URL = "https://pokeapi.co/api/v2/pokemon";
const getPokemonByNames = async (name) => {
  const resultado = await Pokemons.findAll({
    where: { Name: name },
    include: [
      {
        model: Type,
        attributes: ["Name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  if (resultado.length > 0) return getPokemonsFromDB(resultado);
  else {
    return await fetch(`${URL}/${name}`)
      .then((response) => response.json())
      .then((pokemon) => {
        return filterPokemonApi(pokemon);
      })
      .catch((error) => {
        throw Error(`Cannot found pokemon ${name}`);
      });
  }
};

module.exports={getPokemonByNames}