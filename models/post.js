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
            // Foreign key is group ID. Must include in Frontend JS
            foreignKey: {
                allowNull: false
            }
        });
        Post.hasMany(models.Feedback, {
            onDelete: "cascade"
        });
    };
    return Post;
};