module.exports = function(sequelize, DataTypes) {
    var Club = sequelize.define("Club", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        clubName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(1234),
            allowNull: false,
        },
        responsablePeda: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        facebook: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        instagram: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Club;
};