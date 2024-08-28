'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PowerUp extends Model {
    static associate(models) {
      PowerUp.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  PowerUp.init({
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    power_up_type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'PowerUp',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return PowerUp;
};