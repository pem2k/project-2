const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Message extends Model { }

Message.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
       rest_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_review: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      friend_review: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      review_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dm_message: {
        type: DataTypes.TEXT,
        allowNull: false,
      }

    },
    {
      sequelize,
      freezeTableName: true,
    }
)

module.exports = Message