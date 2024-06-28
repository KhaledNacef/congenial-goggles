const { DataTypes } = require('sequelize');

const Admin = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image:{
    type:DataTypes.STRING,
    allowNull:false
  }
};

module.exports= Admin;
