const { Type } = require("../db");

const getTypes = async () => {
    const resultados = await Type.findAll();
    return resultados;
  };

module.exports =  {getTypes} ;