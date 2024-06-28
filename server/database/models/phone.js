const { DataTypes,Sequelize } = require('sequelize');

const Phone =  {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneHolder: {
    type: DataTypes.STRING,
    allowNull: false
  },

  holderNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  problem:{
    type:DataTypes.STRING,
    allowNull:false
  },
 
  delivredOn:{
    type:DataTypes.STRING,
    allowNull:false

  },
  status:{
    type:DataTypes.STRING,
    allowNull:false
  }
};

module.exports = Phone;
