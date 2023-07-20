const { saveTypesInDB,allTypes } = require("../controllers/allTypes");
const {Type}=require("../db")
const STATUS_ERROR=404;
const STATUS_OK=200
const getTypes = async (req, res) => {
    try {
        const types = await allTypes()
        await saveTypesInDB(types)
        const everyType = await Type.findAll()
        return res.status(STATUS_OK).send(everyType);
    } catch (error) {
        res.status(STATUS_ERROR).json({ "error": error.message });
    }
};
module.exports =  {getTypes} ;