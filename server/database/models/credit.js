const { DataTypes } = require('sequelize');

  const Credit ={
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    client: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    num: {
      type: DataTypes.INTEGER, // Use INTEGER instead of NUMBER
      allowNull: false,
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    credit: {
      type: DataTypes.FLOAT, // Use INTEGER instead of NUMBER
      allowNull: false,
    },
    rest: {
      type: DataTypes.FLOAT, // Use INTEGER instead of NUMBER
      allowNull: true,
    },
    pay: {
      type: DataTypes.FLOAT, // Use INTEGER instead of NUMBER
      allowNull: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  

};

module.exports = Credit;
