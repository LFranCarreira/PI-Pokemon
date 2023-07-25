const { getTypes } = require("../controllers/allTypes");
const {Type}=require("../db")
const STATUS_ERROR=404;
const STATUS_OK=200
const getAllTypes = async (req, res) => {
    try {
        const types = await getTypes()
        return res.status(STATUS_OK).send(types);
    } catch (error) {
        res.status(STATUS_ERROR).json({ error: error.message });
    }
};
module.exports =  {getAllTypes} ;