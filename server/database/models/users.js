const { DataTypes } = require('sequelize');

const User = {
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
    unique: true,
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  AccountStatus: {
    type: DataTypes.STRING,
    defaultValue: 'active', 
  },
  PhoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  City: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Government: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Facebook: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  CompanyName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Country: {
    type: DataTypes.STRING,
    allowNull: true,
  }
};

module.exports = User;
