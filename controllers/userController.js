//let User = require('../models/db').user;
let db = require("../models/db");

// get all users
exports.getUsers = function(req, res) {
    db.user.findAll().then(users => res.send(users));
};

/* // с формой при помощи представлений(дальше тоже !)
exports.getUsers = function(req, res) {
    db.user.findAll().then(data => {
      console.log("***data *** = ", data)
      res.render("index.hbs", {
        users: data
      });
    }).catch(err => console.log(err));
};*/

// post new user
exports.postUser = (req, res) => {
    db.user.create({
       name: req.body.name,
       age: req.body.age
    }).then(submitedUser => res.send(submitedUser));
};

/*exports.postUser = function(req, res) {

    if(!req.body) return res.sendStatus(400);

    const username = req.body.name;
    const userage = req.body.age;
    db.user.create({ name: username, age: userage}).then(() => {
      res.redirect("/users");
    }).catch(err => console.log(err));
};*/

// get single user by id
exports.getUserWithId = (req, res) => {
    db.user.findAll({
      where: {
        id: req.params.id
      }
    }).then(user => res.send(user));
};

/*// получаем объект по id для редактирования
exports.getUserWithId = function(req, res) {
  const userid = req.params.id;
  db.user.findAll({where:{id: userid}, raw: true })
  .then(data => {
    res.render("edit.hbs", {
      user: data[0]
    });
  })
  .catch(err => console.log(err));
};*/

// delete book
exports.deleteUser = (req, res) => {
    db.user.destroy({
    where: {
      id: req.params.id
    }
  }).then((user) => res.send("success delete"));
};

// edit a book
exports.editUser = (req, res) => {
   db.user.update(
     {
       name: req.body.name,
       age: req.body.age
     },
     {
       where: { id: req.body.id }
     }
 ).then( () => res.send("success update") );
};

/*// обновление данных в БД
exports.editUser = function (req, res) {
  if(!req.body) return res.sendStatus(400);

  const username = req.body.name;
  const userage = req.body.age;
  const userid = req.body.id;
  db.user.update({name:username, age: userage}, {where: {id: userid} }).then(() => {
    res.redirect("/users");
  })
  .catch(err=>console.log(err));
};*/

/*exports.deleteUser = function(req, res){
  const userid = req.params.id;
  db.user.destroy({where: {id: userid} }).then(() => {
    res.redirect("/users");
  }).catch(err => console.log(err));
};*/
