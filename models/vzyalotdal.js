module.exports = (sequelize, DateTypes) => {
const Vzyalotdal = sequelize.define("vzyalotdal", {
  id: {
    type: DateTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  vozvrat: {
    type:  DateTypes.BOOLEAN,
    allowNull: false
  }
});
return Vzyalotdal;
};
