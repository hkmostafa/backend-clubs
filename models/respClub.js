module.exports = function (sequelize, DataTypes) {
    var respClub = sequelize.define("respClub", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      }});
  
    return respClub;
  };
  