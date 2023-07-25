const { getPokemonById }=require("../controllers/getPokemonById");
const STATUS_ERROR=404
const STATUS_OK=200
const getPokemonId = async (req, res) => {  
  const {idPokemon}=req.params
  try{
    const pk = await getPokemonById(idPokemon);
    res.status(STATUS_OK).json(pk);
  }catch(error){
    res.status(STATUS_ERROR).json({error:error.message})
  }
}


module.exports={getPokemonId}