const {User} = require('../models/user.js')
const {Autor} = require('../models/autor.js')

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

//Book.belongsTo(User)
//Book.belongsTo(Autor)
Book.associate = (models) => {
  Book.belongsTo(models.user);
  Book.belongsTo(models.autor);
}

return Book;
};
