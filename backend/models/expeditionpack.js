'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ExpeditionPack extends Model {
    static associate(models) {
      ExpeditionPack.belongsTo(models.User, { foreignKey: 'creator_id', as: 'creator' });
      ExpeditionPack.hasMany(models.Question, { foreignKey: 'pack_id' });
    }
  }
  ExpeditionPack.init({
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: DataTypes.TEXT,
    creator_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    is_official: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'ExpeditionPack',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return ExpeditionPack;
};