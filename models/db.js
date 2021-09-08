const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);
const db = {};

// определяем объект Sequelize
const sequelize = new Sequelize("Library", "root", "1111", {
  dialect: "mysql",
  host: "localhost",
  logging: false,
  define: {
    timestamps: false
  }
});

fs.readdirSync(__dirname).filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js')).forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    console.log('*** model *** = ', model);
    console.log('*** model.name *** = ', model.name);

    db[model.name] = model;
    console.log('*** db *** = ', db);
});

Object.keys(db).forEach(modelName => {
//  console.log('***db[modelName].associate*** = ', db[modelName].associate);
  if (db[modelName].associate) {
//    console.log('***db[modelName].associate*** = ', db[modelName].associate);
    db[modelName].associate(db);
console.log('***db[modelName].associate*** = ', db[modelName].associate);
}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
