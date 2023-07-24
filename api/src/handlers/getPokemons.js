const { getPokemonsFromApi,getPokemonsFromDB }=require("../controllers/getAllPokemons")
const STATUS_ERROR=404
const STATUS_OK=200
const getAllPokemons=async (req,res)=>{
    try {
      const [infoApi, dbInfo] = await Promise.all([getPokemonsFromApi(), getPokemonsFromDB()])
    
        // Agregar la propiedad 'types' a los objetos de la base de datos
        const dbinfoWithTypes = dbInfo.map((pokemon) => {
          return {
            ...pokemon.dataValues
            // types:pokemon.Types.map((type)=>type.name)
          };
        });
    
        const infoTotal = [...infoApi, ...dbinfoWithTypes];
        res.status(STATUS_OK).json(infoTotal)
      } catch (error) {
        res.status(STATUS_ERROR).json(error.message);
      }
}
module.exports={getAllPokemons}