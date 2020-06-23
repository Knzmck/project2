'use strict';
module.exports = function (sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
        // AKA title of post
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // user will have to type in the author name they want to associate with the post
        authorName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        topic: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // set user id of creator in post here
        UserId: {
            type: DataTypes.INTEGER,
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