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
      type: DataTypes.ENUM('multiplechoice', 'truefalse'),
      allowNull: false
    },
    correctAnswer: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    wrongAnswers: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    difficulty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: 1,
        max: 5
      }
    }
  }, {
    sequelize,
    modelName: 'Question',
    tableName: 'questions',
    timestamps: true
  });
  return Question;
};