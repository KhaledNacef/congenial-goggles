const { DataTypes,Sequelize } = require('sequelize');

const Pc =  {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
  maindouvre:{
    type: DataTypes.FLOAT,
    allowNull: true


  },
  accopmte:{
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
