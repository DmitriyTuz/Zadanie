require("dotenv").config();
const express = require("express");
const app = express();

const userRouter = require("./routes/userRouter.js");
const homeRouter = require("./routes/homeRouter.js");
const bookRouter = require("./routes/bookRouter.js");
const autorRouter = require("./routes/autorRouter.js");

const wrongRoute = require("./middleware/wrongRouter1.js");

const db = require("./models/db");

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

let User = db.user;
let Autor = db.autor;
let Book = db.book;


console.log(1);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(2);

//User.belongsToMany(Book, {through: Vzyalotdal});
//Book.belongsToMany(User, {through: Vzyalotdal});

//Autor.hasMany(Book, { onDelete: "cascade" });

console.log(3);

// синхронизация с бд, после успшной синхронизации запускаем сервер
db.sequelize.sync().then(() => {
  app.listen(port, function(){
    console.log(`Сервер ожидает подключения на порту ${port}`);
  });
    }).then((res) => {
      console.log(4);
      }).catch(err => console.log(err));

//app.set("view engine", "hbs");

app.use("/users", userRouter);

console.log('мой запрос ! ', db.sequelize.query);

console.log(5);

//app.use("/users", homeRouter);

console.log(6);

app.use("/books", bookRouter);

console.log(7);

app.use("/autors", autorRouter);

console.log(8);

// This should be the last route else any after it won't work
app.use("*", wrongRoute.wrongRoute);

