'use strict';
module.exports = function (sequelize, DataTypes) {
    const Group = sequelize.define("Group", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Group.associate = function (models) {
        Group.hasMany(models.Post, {
            onDelete: "cascade"
        })
        // Group.belongsToMany(models.User, {
        //     through: 'GroupUser',
        //     as: 'users',
        //     foreignKey: 'GroupId'
        // })
    }
    return Group;
};