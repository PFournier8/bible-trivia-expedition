'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ExpeditionPack extends Model {
    static associate(models) {
      ExpeditionPack.belongsTo(models.User, { foreignKey: 'creatorId', as: 'creator' });
      ExpeditionPack.hasMany(models.Question, { foreignKey: 'packId' });
    }
  }
  ExpeditionPack.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: DataTypes.TEXT,
    creatorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    isOfficial: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'ExpeditionPack',
    timestamps: true
  });
  return ExpeditionPack;
};