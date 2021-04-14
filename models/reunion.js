module.exports = function (sequelize, DataTypes) {
    var Reunion = sequelize.define("Reunion", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      meet_date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
        
      }},
      {timestamps: true});
    
  
    return Reunion;
  };
  