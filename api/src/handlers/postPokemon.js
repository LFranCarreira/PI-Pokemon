const {newPokemon}=require("../controllers/newPokemon")
const STATUS_OK=200;
const STATUS_ERROR=404;
const postPokemon = async (req, res) => {
  try {
    await newPokemon(req.body);
    res.status(STATUS_OK).json("Pokemon created succesfully");
  } catch (error) {
    res.status(STATUS_ERROR).json({ error: error.message });
  }
};
  
  module.exports = {postPokemon};