module.exports = function(sequelize, DataTypes) {
    var Club = sequelize.define("Club", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        club_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        logo: {
            type: DataTypes.STRING,
            allowNull: true
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
            allowNull: false,
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