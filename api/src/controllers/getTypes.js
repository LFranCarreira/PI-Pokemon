const axios = require("axios");
const URL = "https://pokeapi.co/api/v2";
const STATUS_OK=200
const STATUS_ERROR=404
const { Type } = require("../db");

const findTypes = async () => {
    const response = (await axios.get(`${URL}/type`)).data.results;
    return response;
};

const saveTypeDB = async (types) => {
    for (let i = 0; i < types.length; i++) {
        const type = types[i];
        await Type.findOrCreate({ where: { name: type.name } });
    }
};

const getTypes = async (req, res) => {
    try {
        const types = await findTypes()
        await saveTypeDB(types)
        const allTypes = await Type.findAll()
        return res.status(STATUS_OK).send(allTypes);
    } catch (error) {
        res.status(STATUS_ERROR).json({ "error": error.message });
    }
};
module.exports =  {getTypes} ;