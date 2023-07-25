const { getPokemons,searchPokemonByName }=require("../controllers/getAllPokemons")
const STATUS_ERROR=404
const STATUS_OK=200
const getAllPokemons=async (req,res)=>{
  const {name} = req.query;
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