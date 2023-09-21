const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon';
const { Pokemons, Type } = require('../db');
const filterPokemonApi = (pokemon) => {
  const types = [];
  //push the types from the api
  pokemon['types'].forEach((element) => {
    types.push(element['type']['name']);
  });
  if (pokemon['id'] >= 650) {
    //from the 650 sprite the gifs are no longer available
    return {
      ID: pokemon['id'],
      Name: pokemon['name'],
      Health: pokemon['stats'][0]['base_stat'],
      Attack: pokemon['stats'][1]['base_stat'],
      Defense: pokemon['stats'][2]['base_stat'],
      Speed: pokemon['stats'][5]['base_stat'],
      Image: pokemon['sprites']['front_default'],
      Height: pokemon['height'],
      Weight: pokemon['weight'],
      Types: types,
    };
  }
  return {
    ID: pokemon['id'],
    Name: pokemon['name'],
    Health: pokemon['stats'][0]['base_stat'],
    Attack: pokemon['stats'][1]['base_stat'],
    Defense: pokemon['stats'][2]['base_stat'],
    Speed: pokemon['stats'][5]['base_stat'],
    Image:
      pokemon['sprites']['versions']['generation-v']['black-white']['animated'][
        'front_default'
      ],
    Height: pokemon['height'],
    Weight: pokemon['weight'],
    Types: types,
  };
};

const filterApiArray = (pokemonArray) => {
  //take the pokemon a return it with the correct info
  const relevantInfo = pokemonArray.map((pokemon) => filterPokemonApi(pokemon));
  return relevantInfo;
};
const fetchPokemonsApi = async () => {
  const links = [];
  await axios
    .get(
      `${URL}/?offset=0&limit=100`
      //take the first 100 pokemons from the api and we get their url with the info
    )
    .then((response) => {
      const data = response.data;
      data.results.map((pokemon) => {
        links.push(pokemon['url']);
      });
    })
    .catch((error) => {
      throw new Error(error);
    });

  const promises = links.map((url) => axios.get(url));
  //we get all the first 100 pokemons with their info
  const responses = await Promise.all(promises);
  const data = await Promise.all(responses.map((response) => response.data));
  return filterApiArray(data);
};
const filterPokemonDB = (pokemon) => {
  const types = [];
  pokemon.Types.forEach((element) => types.push(element.Name)); // we push the types
  pokemon.Types = types; // and we change 'Type' for 'Types'
  return pokemon;
};

const fetchPokemonsDB = async () => {
  const PokemonsDB = await Pokemons.findAll({
    //we get the pokemons that are in the DB
    include: [
      {
        model: Type,
        attributes: ['Name'],
        through: {
          attributes: [],
        },
      },
    ],
  });
  const correctedPokemonsDB = PokemonsDB.map((item) => item.dataValues);
  const formattedPokemons = correctedPokemonsDB.map((pokemon) =>
    filterPokemonDB(pokemon)
  );
  //We get the pokemons and correct how the types are gotten
  return formattedPokemons;
};

const getPokemons = async () => {
  const PokemonsDB = await fetchPokemonsDB();
  //we get the pokemons from the DB(all)
  const PokemonsApi = await fetchPokemonsApi();
  //we get the pokemons from the API(the first 100)
  const Pokemons = [...PokemonsDB, ...PokemonsApi];
  //we return all the pokemons from db and api
  return Pokemons;
};
const searchPokemonByName = async (name) => {
  const pk = await Pokemons.findAll({
    //first we try to finde the pokemon from the DB, because they are less in there
    where: { Name: name },
    include: [
      {
        model: Type,
        attributes: ['Name'],
        through: {
          attributes: [],
        },
      },
    ],
  });
  //if there was a pokemon from the DB that matches the name, we filter it and return it
  if (pk.length > 0) return filterPokemonDB(pk[0].dataValues);
  //if not, we try to find it in the api,filter it and return it, if we cannot find it, we return an error
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
module.exports = {
  getPokemons,
  searchPokemonByName,
  filterPokemonApi,
  filterPokemonDB,
};
