'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.belongsTo(models.ExpeditionPack, { foreignKey: 'pack_id' });
    }
  }
  Question.init({
    pack_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ExpeditionPacks',
        key: 'id'
      }
    },
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    correct_answer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    wrong_answers: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    },
    difficulty: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'Question',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Question;
};