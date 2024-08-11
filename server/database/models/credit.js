const { DataTypes } = require('sequelize');

const Credit = (sequelize) => {
  const CreditModel = sequelize.define('Credit', {
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
    credit: {
      type: DataTypes.INTEGER, // Use INTEGER instead of NUMBER
      allowNull: false,
    },
    rest: {
      type: DataTypes.INTEGER, // Use INTEGER instead of NUMBER
      allowNull: true,
    },
    pay: {
      type: DataTypes.INTEGER, // Use INTEGER instead of NUMBER
      allowNull: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCreate: (credit) => {
        // Set `rest` to `credit - pay`
        credit.rest = credit.credit - (credit.pay || 0);
      },
      beforeUpdate: (credit) => {
        // Recalculate `rest` when `credit` or `pay` is updated
        credit.rest = credit.credit - (credit.pay || 0);
      }
    }
  });

  return CreditModel;
};

module.exports = Credit;
