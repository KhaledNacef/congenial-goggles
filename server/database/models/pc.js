const { DataTypes,Sequelize } = require('sequelize');

const Pc =  {
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
  pcHolder: {
    type: DataTypes.STRING,
    allowNull: false
  },

  holderNumber: {
    type: DataTypes.STRING,
    allowNull: true
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
  accompte:{
    type: DataTypes.FLOAT,
    allowNull: true

  },
 
  remarque:{
    type: DataTypes.STRING,
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

module.exports = Pc;
