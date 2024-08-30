// models/packAttempt.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PackAttempt extends Model {
    static associate(models) {
      PackAttempt.belongsTo(models.User, { foreignKey: 'userId' });
      PackAttempt.belongsTo(models.ExpeditionPack, { foreignKey: 'packId' });
    }
  }
  PackAttempt.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    packId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ExpeditionPacks',
        key: 'id'
      }
    },
    wasPerfect: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    highestScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    timeCompleted: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'PackAttempt',
    timestamps: true
  });
  return PackAttempt;
};