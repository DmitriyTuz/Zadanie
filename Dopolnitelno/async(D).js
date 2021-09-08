const Sequelize = require("sequelize");

const sequelize = new Sequelize("test", "root", "1111", {
    dialect: "mysql",
    host: "localhost",
//    logging: false,
    define: {
        timestamps: false
    }
});

function createTables() {
    return new Promise((resolve, reject) => {
        const Product = sequelize.define("product", {
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

        const Company = sequelize.define("company", {
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
        Company.hasMany(Product, { onDelete: "cascade" });

        sequelize.sync({force:true}).then(() => {
            console.log("Tables have been created");
            resolve({Company, Product});
            }).catch(err => console.log(err));
    });
};

function createCompany(response) {
    return new Promise((resolve, reject) => {
        response.Company.create({ name: "Apple"}).then(res => {


            // получаем id созданной компании
            const compId = res.id;
            //создаем пару товаров для этой компании
            response.Product.create({name:"iPhone XS", price: 400, companyId: compId}).catch(err=>console.log(err));
            response.Product.create({name:"iPhone XR", price: 350, companyId: compId}).catch(err=>console.log(err));
            resolve(response.Company);
        }).catch(err => console.log(err));
    });
};

function findCompany(Company) {
    return new Promise((resolve, reject) => {
        Company.findByPk(1).then(company => {
            if (!company) return console.log("Company not found");
            company.getProducts().then(res => {
                for (let i = 0; i < res.length; i++) {
                    console.log(res[i].name, " - ", company.name);
                }

//                resolve('Done');
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    });
};

async function fnAsync() {
  let res = await createTables();
  console.log('***res*** = ', res);
  let res1 = await createCompany(res);
  console.log('***res1*** = ', res1);
  findCompany(res1);
}

fnAsync();
