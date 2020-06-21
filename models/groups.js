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
        Group.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Group;
};