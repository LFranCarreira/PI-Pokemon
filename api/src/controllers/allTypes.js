const { Type } = require('../db');

const getTypes = async () => {
  //GET ALL TYPES
  const resultados = await Type.findAll();
  return resultados;
};

module.exports = { getTypes };
