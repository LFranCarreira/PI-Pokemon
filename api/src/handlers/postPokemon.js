const newPokemon=require("../controllers/newPokemon")
const STATUS_OK=200;
const STATUS_ERROR=404;
const postPokemon = async (req, res)=>{
    const {
        id,
        name,
        image,
        health,
        attack,
        defense,
        speed,
        height,
        weight,
        typeOne,
        typeTwo,
    } = req.body;
    try {
      const pokemon = await newPokemon(id,name,image,health,attack,defense,speed,height,weight,typeOne,typeTwo);
      res.status(STATUS_OK).json("Pokemon created succesfully");
    } catch (error) {
      res.status(STATUS_ERROR).json({ "error": error.message });
    }
  };
  
  module.exports = {postPokemon};