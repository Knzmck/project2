'use strict';
module.exports = function (sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Post.associate = function (models) {
        Post.belongsTo(models.Group, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Post;
};