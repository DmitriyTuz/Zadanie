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

Autor.associate = (models) => {
  Autor.hasMany(models.book, { onUpdate: "cascade", onDelete: "cascade", hooks: true });
}

return Autor;
};
