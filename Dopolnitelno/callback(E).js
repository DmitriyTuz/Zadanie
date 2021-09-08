const Sequelize = require("sequelize");

const sequelize = new Sequelize("test", "root", "1111", {
    dialect: "mysql",
    host: "localhost",
    define: {
      timestamps: false
    }
});

createModels = (callback) => {

Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Company = sequelize.define("company", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
Company.hasMany(Product);

sequelize.sync({force:true}).then(() => {
  console.log("Tables have been created");
  let db = {Company, Product}
  callback(db);
}).catch(err => console.log(err));

};

createCompany = (db, callback1) => {

    db.Company.create({ name: "Apple"}).then(res => {

    // получаем id созданной компании
    const compId = res.id;
    //создаем пару товаров для этой компании
    db.Product.create({name:"iPhone XS", price: 400, companyId: compId}).catch(err=>console.log(err));
    db.Product.create({name:"iPhone XR", price: 350, companyId: compId}).catch(err=>console.log(err));

    return callback1(db);

}).catch(err => console.log(err));

};

getProducts = (db) => {

db.Company.findByPk(1).then(company => {

  if(!company) return console.log("Company not found");
  company.getProducts()
  .then(res => {
    for(let i=0; i < res.length; i++)
      console.log(res[i].name, " - ", company.name);

  })
  .catch(err => console.log(err));
}).catch(err => console.log(err));

};

createModels(function (res) {
  createCompany(res, function (res) {
    getProducts(res);
  });
});
