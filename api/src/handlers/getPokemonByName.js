const {getPokemonByNames}=require("../controllers/getPokemonsByName.js")
const STATUS_ERROR=404
const STATUS_OK=200
const getPokemonByName = async (req, res) => {
  const { name } = req.query;
  try {
    const response = await getPokemonByNames(name);
    return res.status(STATUS_OK).json(response);
  } catch (error) {
    res.status(STATUS_ERROR).json(error.message);
  }
};
  module.exports={getPokemonByName}