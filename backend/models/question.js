// models/question.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.belongsTo(models.ExpeditionPack, { foreignKey: 'packId' });
      Question.hasMany(models.Answer, { foreignKey: 'questionId' });
    }
  }
  Question.init({
    packId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ExpeditionPacks',
        key: 'id'
      }
    },
    questionText: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    questionType: {
      type: DataTypes.ENUM('truefalse', 'multiplechoice'),
      allowNull: false,
      defaultValue: 'multiplechoice'
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'Question',
    tableName: 'questions',
  });
  return Question;
};