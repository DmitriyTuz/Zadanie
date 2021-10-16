const {Book} = require('../models/book.js')
module.exports = (sequelize, DateTypes) => {
const Autor = sequelize.define("autor", {
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

//Autor.hasMany(Book)
Autor.associate = (models) => {
  Autor.hasMany(models.book, { onUpdate: "cascade", onDelete: "cascade", hooks: true });
}

return Autor;
};
