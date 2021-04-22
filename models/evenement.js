module.exports = function(sequelize, DataTypes) {
    var Evenement = sequelize.define("Evenement", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        evTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        evDescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        evDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        evPoster: {
            type: DataTypes.STRING,
            allowNull: true
        },
        annDate: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now'),
            allowNull: false
        }
    });

    return Evenement;
};