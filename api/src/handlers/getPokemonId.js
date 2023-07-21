const { getPokemonById }=require("../controllers/getPokemonById");
const STATUS_ERROR=404
const STATUS_OK=200
const getPokemonId=async (req,res)=>{
    const { id } = req.params;
    try {
      const pokemon = await getPokemonById(id);
      res.status(STATUS_OK).json(pokemon);
    } catch (error) {
      res.status(STATUS_ERROR).json({ error: error.message});
    }
}
module.exports={getPokemonId}