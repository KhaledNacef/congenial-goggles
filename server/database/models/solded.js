const { DataTypes } = require('sequelize');

const Solded =  {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
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
    allowNull: false
  }
};

module.exports = Solded;
