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
    return Group;
    // Group.associate = function (_models) {
    //     Group.hasMany(models.User, {

    //     });
    // }
};