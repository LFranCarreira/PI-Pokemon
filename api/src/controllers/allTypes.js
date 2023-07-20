const axios = require("axios");
const URL = "https://pokeapi.co/api/v2";
const STATUS_OK=200
const STATUS_ERROR=404
const { Type } = require("../db");

const allTypes = async () => {
    const response = (await axios.get(`${URL}/type`)).data.results;
    return response;
};

const saveTypesInDB = async (types) => {
    for (let i = 0; i < types.length; i++) {
        const type = types[i];
        await Type.findOrCreate({ where: { name: type.name } });
    }
};

module.exports =  {allTypes,saveTypesInDB} ;