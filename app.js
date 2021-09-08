const express = require("express");
const app = express();

const userRouter = require("./routes/userRouter.js");
const homeRouter = require("./routes/homeRouter.js");
const bookRouter = require("./routes/bookRouter.js");
const autorRouter = require("./routes/autorRouter.js");

const db = require("./models/db");

let User = db.user;
let Autor = db.autor;
let Book = db.book;
let Vzyalotdal = db.vzyalotdal;

const createDataBase = () => {
    return new Promise(function(resolve, reject) {

console.log(1);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

console.log(2);

//User.belongsToMany(Book, {through: Vzyalotdal});
//Book.belongsToMany(User, {through: Vzyalotdal});

//Autor.hasMany(Book, { onDelete: "cascade" });

console.log(3);

// синхронизация с бд, после успшной синхронизации запускаем сервер
db.sequelize.sync({force:true}).then(() => {
  app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
  });
    }).then((res) => {
        resolve({User, Autor, Book, Vzyalotdal});
        console.log(4);
      }).catch(err => console.log(err));
});
};



//app.set("view engine", "hbs");

const createRouters = ({User, Autor, Book, Vzyalotdal}) => {
    return new Promise(function(resolve, reject) {

app.use("/users", userRouter);

console.log(5);

//app.use("/users", homeRouter);

console.log(6);

app.use("/books", bookRouter);

console.log(7);

app.use("/autors", autorRouter);

resolve({User, Autor, Book, Vzyalotdal});
console.log(8);
});
};

const createAutorAndBooks = ({User, Autor, Book, Vzyalotdal}) => {
    return new Promise(function(resolve, reject) {

      let autors = ['Pushkin', 'Russkie Narodnie', 'Gans Hristian Anderson'];

      let books = {
              'Pushkin': ['Zolotaja Ribka', 'U Lukomorya', 'Zolotoj Petushok'],
              'Russkie Narodnie': ['Kolobok', 'Tri Bogatirya', 'Kurochka Ryaba'],
              'Gans Hristian Anderson': ['Priklucheniya Nilsa']
          };

      let a = [];

      for (let i = 0; i < autors.length; i++) {
        a.push(Autor.create({name: autors[i]}));
      }

/*let a = [
          Autor.create({name: 'Pushkin'}),
          Autor.create({name: 'Russkie Narodnie'}),
          Autor.create({name: 'Gans Hristian Anderson'})
        ];*/

      Promise.all(a).then((res1) => {
//        console.log('***res1*** = ', res1);
// реализация Лёхи через вложенный цикл
//          let res = [{id: 1, name: 'Pushkin'}, {id: 2, name: 'Russkie Narodnie'}, {id: 3, name: 'Gans Hristian Anderson'}];

        let c = [];

//  console.log('***res1*** = ', res1);

        for (let i = 0; i < res1.length; i++) {
          c.push(res1[i].dataValues)
        }
        console.log('***c*** = ', c);
        return c;
      })

      .then((res) => {
        console.log('***res*** = ', res);
        let b = [];

        for (let i = 0; i < res.length; i++) {
          if (books[res[i].name]) {
            for (let j = 0; j < books[res[i].name].length; j++) {
              b.push(Book.create({autorId: res[i].id, name: books[res[i].name][j]}));
            }
          }
        }

        /*for (let i = 0; i < res.length; i++) {
          if (books[res[i].name]) {
            for (let j = 0; j < books[res[i].name].length; j++) {
              b.push(Book.create({autorId: res[i].id, name: books[res[i].name][j]}));
            }
          }
        }*/
        return Promise.all(b);
      })


      .then((res2) => {
//        console.log('***res2*** = ', res2);
        console.log('***Передаём во 2й ресолв*** - ', {User, Autor, Book, Vzyalotdal});
        resolve({User, Autor, Book, Vzyalotdal});
      }).catch(err => console.log(err));

});
};
// моя реализация по Метаниту
/*let a = [
          Autor.create({name: 'Pushkin'}),
          Autor.create({name: 'Russkie Narodnie'}),
          Autor.create({name: 'Gans Hristian Anderson'})
        ];

Promise.all(a)
.then((res) => {
  const autorId = res[0].id;
  console.log('***res[0].id*** = ', autorId);

      let b = [
                Book.create({name: 'Zolotaja Ribka', autorId: res[0].id}),
                Book.create({name: 'U Lukomorya', autorId: res[0].id}),
                Book.create({name: 'Zolotoj Petushok', autorId: res[0].id}),

                Book.create({name: 'Kolobok', autorId: res[1].id}),
                Book.create({name: 'Tri Bogatirya', autorId: res[1].id}),
                Book.create({name: 'Kurochka Ryba', autorId: res[1].id}),

                Book.create({name: 'Priklucheniya Nilsa', autorId: res[2].id})
              ];

      Promise.all(b)
      .then((res2) => {
        console.log('***res2*** = ', res2);
        console.log('***Передаём во 2й ресолв*** - ', {User, Autor, Book, Vzyalotdal});
        resolve({User, Autor, Book, Vzyalotdal});
      });

      }).catch(err => console.log(err));
}).catch(err => console.log(err));
};//.catch(err => console.log(err));*/


/*Autor.create({name: 'Pushkin'}).then((res) => {
  const autorId = res.id;
  console.log('***autorId*** = ', res.id);

  let p = [
            Book.create({name: 'Zolotaja Ribka', autorId: autorId}),
            Book.create({name: 'U Lukomorya', autorId: autorId}),
            Book.create({name: 'Zolotoj Petushok', autorId: autorId})
          ];

Promise.all(p)
.then((res1) => {
  console.log('***created books*** - ' , res1);
    for (i = 0; i < res1.length; i++) {
      console.log(res1[i].dataValues);
    };
    console.log(9);
})
  .then((res2) => {
    console.log('***Передаём во 2й ресолв*** - ', {User, Autor, Book});
    resolve({User, Autor, Book});
});

}).catch(err => console.log(err));
}).catch(err => console.log(err));
};//.catch(err => console.log(err));*/


const findAutor = ({User, Autor, Book, Vzyalotdal}) => {
    return new Promise(function (resolve, reject) {

        Autor.findByPk(2).then(autor => {
            if (!autor) return console.log("Autor not found");
            autor.getBooks().then(res => {
        //        console.log('***test*** res =', res.dataValues);
                for (let i = 0; i < res.length; i++) {
                    console.log(res[i].name, " - ", autor.name);
//                    console.log('***test*** res =', res[i].dataValues);
                }
                console.log(9);

            })
            .then(() => {
                resolve({User, Autor, Book, Vzyalotdal});
                console.log(10);
            }).catch(err => console.log(err));

        }).catch(err => console.log(err));

  });
};

const createUser = ({User, Autor, Book, Vzyalotdal}) => {
  return new Promise(function(resolve, reject) {

// создадим несколько объектов юзеров
    let users = [
                  {name: 'Alexandr', age: 45},
                  {name: 'Dmitriy', age: 37},
                  {name: 'Alexey', age: 34}
                ]

    let u = [];

    for (let i = 0; i < users.length; i++) {
      u.push(User.create({name: users[i].name, age: users[i].age}));
    }

/*let u = [
          User.create({name: 'Alexandr', age: 45}),
          User.create({name: 'Dmitriy', age: 37}),
          User.create({name: 'Alexey', age: 34})
        ];*/

Promise.all(u)
.then(() => {
    console.log('***Передаём во второй ресолв*** - ', {User, Autor, Book, Vzyalotdal});
    resolve({User, Autor, Book, Vzyalotdal});
  });
});
};

const addBookToUser = ({User, Autor, Book, Vzyalotdal}) => {
  return new Promise(function(resolve, reject) {

// получаем пользователя с именем Dmitriy
    User.findOne({where: {name: "Dmitriy"}})
    .then(user => {
      console.log(1);
      if (!user) return;

  // добавим юзеру с именем Dmitriy книгу Zolotoj Petushok
  // метод addИМЯ_МОДЕЛИ()
      Book.findOne({where: {name: "Zolotoj Petushok"}})
      .then(book => {
        console.log(2);
        if (!book) return;
        user.addBook(book, {through: {vozvrat:true}})

// аналогично получаем пользователя с именем Alexandr
          .then(() => {
            User.findOne({where: {name: "Alexandr"}})
            .then(user => {
              console.log(1);
              if (!user) return;

          // добавим Александру книгу Курочка Ряба;
          // метод addИМЯ_МОДЕЛИ()
              Book.findOne({where: {name: "Kurochka Ryaba"}})
              .then(book => {
                console.log(2);
                if (!book) return;
                user.addBook(book, {through: {vozvrat:true}})
              })

                .then(() => {
                  console.log(3);
                  console.log('***Передаём в третий ресолв*** - ', {User, Autor, Book, Vzyalotdal});
                  resolve({User, Autor, Book, Vzyalotdal});
                });
            });
          });
      });
    });
});
};
                        // ПОЛУЧЕНИЕ СВЯЗАННЫХ ДАННЫХ

const getBooks = ({User, Autor, Book, Vzyalotdal}) => {
  return new Promise(function(resolve, reject) {
// метод getИМЯ_МОДЕЛИ();
// например, получим все книги юзера по имени Alexandr
User.findOne({where: {name: 'Alexandr'}})
.then(user => {
    if(!user) return;
    user.getBooks().then(books => {
        for(book of books){
            console.log(book.name);
        }
    });
});
});
};
/*const CreateUsersAddBooks = ({User, Autor, Book}) => {
    return new Promise(function (resolve, reject) {

let u = [
          User.create({name: 'Alexandr', age: 45}),
          User.create({name: 'Dmitriy', age: 37}),
          User.create({name: 'Alexey', age: 34})
        ];

Promise.all(u)
.then((user) => {
  User.findOne({where: {name: "Dmitry"}})
  .then(user => {
    if(!user) return;

    // добавим Диме книгу 'Курочка Ряба'
    Book.findOne({where: {name: "Kurochka Ryba"}})
    .then(book => {
      if(!book) return;
      user.addBook(book, {through:{grade:1}});
    })
      .then(() => {
        User.findOne({where: {name: "Dmitriy"}})
          .then(user => {
            if(!user) return;
            user.getBooks()
              .then(books => {
                for(book of books) {
                  console.log(book.name);
                };
              }).catch(err => console.log(err));
          }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
}).catch(err => console.log(err));

});
};*/

createDataBase()
    .then(res => createRouters(res))
    .then(res => createAutorAndBooks(res))
    .then(res => findAutor(res))
    .then(res => createUser(res))
    .then(res => addBookToUser(res))
    .then(res => getBooks(res))














//app.set("view engine", "hbs");

/*1)// получение данных
app.get("/", function(req, res){
    User.findAll({raw: true }).then(data => {
      console.log("***data *** = ", data)
      res.render("index.hbs", {
        users: data
      });
    }).catch(err => console.log(err));
});*/

/*2)// получение формы
app.get("/create", function(req, res){
    res.render("create.hbs");
});*/

/*3)// добавление данных
app.post("/create", urlencodedParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const username = req.body.name;
    const userage = req.body.age;
    User.create({ name: username, age: userage}).then(() => {
      res.redirect("/");
    }).catch(err => console.log(err));
});*/

/*4)// получаем объект по id для редактирования
app.get("/edit/:id", function(req, res) {
  const userid = req.params.id;
  User.findAll({where:{id: userid}, raw: true })
  .then(data => {
    res.render("edit.hbs", {
      user: data[0]
    });
  })
  .catch(err => console.log(err));
});*/

/*5)// обновление данных в БД
app.post("/edit", urlencodedParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);

  const username = req.body.name;
  const userage = req.body.age;
  const userid = req.body.id;
  User.update({name:username, age: userage}, {where: {id: userid} }).then(() => {
    res.redirect("/users");
  })
  .catch(err=>console.log(err));
});*/

//6) удаление данных
/*app.post("/delete/:id", function(req, res){
  const userid = req.params.id;
  User.destroy({where: {id: userid} }).then(() => {
    res.redirect("/");
  }).catch(err => console.log(err));
});*/
