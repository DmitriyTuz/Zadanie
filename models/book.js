module.exports = (sequelize, DateTypes) => {
const Book = sequelize.define("book", {
  id: {
    type:  DateTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type:  DateTypes.STRING,
    allowNull: false
  }
});

Book.associate = (models) => {
  Book.belongsToMany(models.user, {through: models.vzyalotdal});
}

return Book;
};
