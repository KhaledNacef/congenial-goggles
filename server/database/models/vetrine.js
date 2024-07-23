const { DataTypes,Sequelize } = require('sequelize');

const Vetrine =  {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false

  },
 
  id: {
    type: DataTypes.INTEGER,
    allowNull: false

  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  serie:{
    type:DataTypes.STRING,
    allowNull:true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  cout:{
    type: DataTypes.FLOAT,
    allowNull: true

  },
  maindoeuvre:{
    type: DataTypes.FLOAT,
    allowNull: true
  },
  
  
    problem:{
    type:DataTypes.STRING,
    allowNull:true
  },
 
  status:{
    type:DataTypes.STRING,
    allowNull:false
  }
};

module.exports = Vetrine;
