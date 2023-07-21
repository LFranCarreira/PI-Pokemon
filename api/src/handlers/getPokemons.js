const { getPokemonsFromApi,getPokemonsFromDB }=require("../controllers/getAllPokemons")
const STATUS_ERROR=404
const STATUS_OK=200
const getAllPokemons=async (req,res)=>{
    try {
      const [infoApi, dbInfo] = await Promise.all([getPokemonsFromApi(), getPokemonsFromDB()])
        const infoTotal = [...infoApi, ...dbInfo];
        res.status(STATUS_OK).json(infoTotal)
      } catch (error) {
        res.status(STATUS_ERROR).json(error.message);
      }
}
module.exports={getAllPokemons}