const { getPokemons,searchPokemonByName }=require("../controllers/getAllPokemons")
const STATUS_ERROR=404
const STATUS_OK=200
const getAllPokemons=async (req,res)=>{
  const {name} = req.query;
  //if it recibes a name from query, it searches the name from the DB or API if the name doesn't exist it catches an error,
  //if the name does not exist it gets the first 100 pokemons from the api, if it fails, it catches an error
  if (name) {
    try {
      const pokemon = await searchPokemonByName(name);
      res.status(STATUS_OK).json(pokemon);
    } catch (error) {
      res.status(STATUS_ERROR).json({ error: error.message });
    }
  } else {
    try {
      const pokemons = await getPokemons();
      res.status(STATUS_OK).json(pokemons);
    } catch (error) {
      res.status(STATUS_ERROR).json({ error: error.message });
    }
  }
}
module.exports={getAllPokemons}