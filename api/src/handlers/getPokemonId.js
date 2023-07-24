const { getPokemonByIdApi,getPokemonByIdDB,getPokemonFromDBName }=require("../controllers/getPokemonById");
const STATUS_ERROR=404
const STATUS_OK=200
const getPokemonById = async (req, res) => {
  try{
    const {idPokemon}=req.params
    const [pkApi,pkDB,pkDBname]=await Promise.all([getPokemonByIdApi(idPokemon), getPokemonByIdDB(idPokemon),getPokemonFromDBName(idPokemon)])
    if(pkApi!==null){res.status(STATUS_OK).json(pkApi)}
    if(pkDB!==null){res.status(STATUS_OK).json(pkDB)}
    if(pkDBname!==null){res.status(STATUS_OK).json(pkDBname)}
    if(pkApi===null && pkDB===null && pkDBname===null)res.status(STATUS_ERROR).json({error:`The pokemon with the id ${idPokemon} cannot be found`})
  }catch(error){
    res.status(STATUS_ERROR).json({error:`The pokemon cannot be found`})
  }
}


module.exports={getPokemonById}