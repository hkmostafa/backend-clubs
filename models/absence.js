module.exports = function (sequelize, DataTypes) {
    var Absence = sequelize.define("Absence", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    });
  
    return Absence;
  };
  