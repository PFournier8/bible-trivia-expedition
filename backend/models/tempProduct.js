'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TempProduct extends Model {
    static associate(models) {
      // define association here
    }
  }
  TempProduct.init({
    title: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    price: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    productUrl: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'TempProduct',
  });
  return TempProduct;
};