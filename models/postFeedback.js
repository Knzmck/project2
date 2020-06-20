'use strict';
module.exports = function (sequelize, DataTypes) {
    const Feedback = sequelize.define("Feedback", {
        authorName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        helpful: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        comment: {
            type: DataTypes.STRING
        }
    });
    Feedback.associate = function (models) {
        Feedback.belongsTo(models.Post, {
            // Foreign key is post ID. Must include in Frontend JS
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Feedback;
};