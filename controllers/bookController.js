const db = require("../models/db");

// get all books
exports.getBooks = (req, res) => {
    db.book.findAll().then(books => res.send(books));
};

// post new book
exports.postBook = (req, res) => {
    db.book.create({
       name: req.body.name,
    }).then(submitedBook => res.send(submitedBook));
};

// get single book by id
exports.getBookWithId = (req, res) => {
    db.book.findAll({
      where: {
        id: req.params.id
      }
    }).then(book => res.send(book));
};

// delete book
exports.deleteBook = (req, res) => {
    db.book.destroy({
    where: {
      id: req.params.id
    }
  }).then((book) => res.send("success delete"));
};

// edit a book
exports.editBook = (req, res) => {
   db.book.update(
     {
       name: req.body.name
     },
     {
       where: { id: req.body.id }
     }
 ).then( () => res.send("success update") );
};

exports.getBookById = (req, res) => {

    db.sequelize.query(`SELECT id, name FROM books WHERE id = ${req.query.id}`,

        function(err, results, fields) {
        //    console.log(err);
        //    console.log(results); // собственно данные
        //    console.log(fields); // мета-данные полей
        }).then(results => res.send(results));
};

exports.getBookByName = (req, res) => {

    db.sequelize.query(`SELECT id, name FROM books WHERE name = ${req.query.name}`,

        function(err, results, fields) {
            //    console.log(err);
            //    console.log(results); // собственно данные
            //    console.log(fields); // мета-данные полей
        }).then(results => res.send(results));
};

exports.getBookByUser = (req, res) => {

    db.sequelize.query(`SELECT id, name FROM books WHERE id = ${req.query.id}`,

        function(err, results, fields) {

        }).then(results => res.send(results));
};

