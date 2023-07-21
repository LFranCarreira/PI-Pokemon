const  {getAllTypes}  = require("../controllers/allTypes.js");
const STATUS_ERROR=404
const STATUS_OK=200

const getTypes = async (req, res) => {
  try {
    const types = await getAllTypes();
    res.status(STATUS_OK).json(types);
  } catch (error) {
    res.status(STATUS_ERROR).json({ error: error.message });
  }
};

module.exports = {getTypes};