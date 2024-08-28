'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserScore extends Model {
    static associate(models) {
      UserScore.belongsTo(models.User, { foreignKey: 'user_id' });
      UserScore.belongsTo(models.ExpeditionPack, { foreignKey: 'pack_id' });
    }
  }
  UserScore.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    pack_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ExpeditionPacks',
        key: 'id'
      }
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    accuracy: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    time_taken: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserScore',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return UserScore;
};