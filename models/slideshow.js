module.exports = function(sequelize, DataTypes) {
    var Slideshow = sequelize.define("slideshow", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    });
    return Slideshow;
};