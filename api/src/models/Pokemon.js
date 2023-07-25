const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemons', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    Name: {
      type: DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Health: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Attack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Defense: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Speed: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    Height: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    Weight:{
      type:DataTypes.INTEGER,
      allowNull:true
    }
  }, {timestamps: false} );
};
