const axios = require("axios");
const URL = "https://pokeapi.co/api/v2/pokemon";
const {Pokemons,Type}=require("../db")
const filterPokemonApi = (pokemon) => {
  const types = [];
  pokemon["types"].forEach((element) => {
    types.push(element["type"]["name"]);
  });
  if(pokemon["id"]>=650){
    return {
      ID: pokemon["id"],
      Name: pokemon["name"],
      Health: pokemon["stats"][0]["base_stat"],
      Attack: pokemon["stats"][1]["base_stat"],
      Defense: pokemon["stats"][2]["base_stat"],
      Speed: pokemon["stats"][5]["base_stat"],
      Image: pokemon["sprites"]["front_default"],
      Height: pokemon["height"],
      Weight: pokemon["weight"],
      Types: types,
    };
  }
  return {
      ID: pokemon["id"],
      Name: pokemon["name"],
      Health: pokemon["stats"][0]["base_stat"],
      Attack: pokemon["stats"][1]["base_stat"],
      Defense: pokemon["stats"][2]["base_stat"],
      Speed: pokemon["stats"][5]["base_stat"],
      Image: pokemon["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"],
      Height: pokemon["height"],
      Weight: pokemon["weight"],
      Types: types,
    };
};

const filterApiArray = (pokemonArray) => {
  const relevantInfo = pokemonArray.map((pokemon) =>
    filterPokemonApi(pokemon)
  );
  return relevantInfo;
};
const fetchPokemonsApi = async () => {
  const links = [];
  await axios.get(`${URL}/?offset=0&limit=100`
  )
    .then((response) => {
      const data = response.data;
      data.results.map((pokemon) => {
        links.push(pokemon["url"]);
      });
    })
    .catch((error) => {
      throw new Error(error);
    });

  const promises = links.map((url) => axios.get(url));
  const responses = await Promise.all(promises);
  const data = await Promise.all(responses.map((response) => response.data));
  return filterApiArray(data);
};
const filterPokemonDB = (pokemon) => {
  const types = [];
  pokemon.Types.forEach((element) => types.push(element.Name));
  pokemon.Types = types; // Cambiamos 'Type' por 'Types'
  return pokemon;
};

const fetchPokemonsDB = async () => {
  const PokemonsBD = await Pokemons.findAll({
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
  const correctedPokemonsBD = PokemonsBD.map((item) => item.dataValues);
  const formattedPokemons = correctedPokemonsBD.map((pokemon) =>
    filterPokemonDB(pokemon)
  );
  return formattedPokemons;
};




const getPokemons = async () => {
  const PokemonsBD = await fetchPokemonsDB();
  const PokemonsApi = await fetchPokemonsApi();
  const Pokemons = [...PokemonsBD, ...PokemonsApi];
  return Pokemons;
};
const searchPokemonByName = async (name) => {
  const pk = await Pokemons.findAll({
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

  if (pk.length > 0) return filterPokemonDB(pk[0].dataValues);
  else {
    try {
      const response = await axios.get(`${URL}/${name}`);
      const pokemon = response.data;
      return filterPokemonApi(pokemon);
    } catch (error) {
      throw new Error(`Pokemon with Name ${name} not found`);
    }
  }
};
module.exports={getPokemons,searchPokemonByName,filterPokemonApi,filterPokemonDB}