// models/question.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      Question.belongsTo(models.ExpeditionPack, { foreignKey: 'packId' });
    }
  }
  Question.init({
    packId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
      type: DataTypes.ENUM('multiplechoice', 'truefalse'),
      allowNull: false,
      defaultValue: 'multiplechoice'
    },
    correctAnswer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    wrongAnswers: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Question',
    tableName: 'questions',
    timestamps: true,
    updatedAt: false
  });
  return Question;
};