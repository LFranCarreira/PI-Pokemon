const axios = require('axios');
const { Types } = require('../db.js')
const URL="https://pokeapi.co/api/v2"

const getAllTypes = async () => {
    const types = await Types.findAll();
    if (types.length === 0) {
      const response = await axios.get(`${URL}/type`);
      const typeNames = response.data.results.map((e) => e.name);
  
      await Types.bulkCreate(typeNames.map((name) => ({ name })));

      const dbtypes =  await Types.findAll()
  
      return  dbtypes;
    }
  
    return types
    }
  
module.exports = {getAllTypes}