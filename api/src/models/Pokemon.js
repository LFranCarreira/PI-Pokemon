const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    ID: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull:false
    },
    Imagen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Vida: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Ataque: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Defensa: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Velocidad: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    Altura: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    Peso:{
      type:DataTypes.INTEGER,
      allowNull:true
    }
  });
};
