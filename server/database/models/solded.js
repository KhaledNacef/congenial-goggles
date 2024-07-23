const { DataTypes } = require('sequelize');

const Solded =  {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true, 

  },
  
  ref: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  buyprice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
  ,
 
  
  image: {
    type: DataTypes.STRING,
    allowNull: true
  }
};

module.exports = Solded;
