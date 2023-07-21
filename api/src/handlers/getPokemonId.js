const { getPokemonByIdApi,getPokemonByIdDB }=require("../controllers/getPokemonById");
const STATUS_ERROR=404
const STATUS_OK=200
const getPokemonById = async (req, res) => {
  try{
    const {idPokemon}=req.params
    const [pkApi,pkDB]=await Promise.all([getPokemonByIdApi(idPokemon), getPokemonByIdDB(idPokemon)])
    if(pkApi!==null){res.status(STATUS_OK).json(pkApi)}
    if(pkDB!==null){res.status(STATUS_OK).json(pkDB)}
  }catch(error){
    res.status(STATUS_ERROR).json({error:error.message})
  }
}


module.exports={getPokemonById}