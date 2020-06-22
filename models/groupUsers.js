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
      allowNull: false
    },
    GroupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return GroupUser;
};