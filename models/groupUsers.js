'use strict';
module.exports = function (sequelize, DataTypes) {
  const GroupUser = sequelize.define('GroupUser', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'UserId'
      }
    },
    GroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Groups',
        key: 'GroupId'
      }
    },
    // Something to test model with
    stuff: {
      type: DataTypes.STRING
    }
  });
  return GroupUser;
};