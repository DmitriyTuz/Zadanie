const db = require("../models/db");
// get all books
exports.getAutors = (req, res) => {
    db.autor.findAll().then(books => res.send(books));
};

// post new book
exports.postAutor = (req, res) => {
    db.autor.create({
       name: req.body.name
    }).then(submitedBook => res.send(submitedBook));
};

// get single book by id
exports.getAutorWithId = (req, res) => {
    db.autor.findAll({
      where: {
        id: req.params.id
      }
    }).then(book => res.send(book));
};

// delete book
exports.deleteAutor = (req, res) => {
    db.autor.destroy({
    where: {
      id: req.params.id
    }
  }).then((book) => res.send("success delete"));
};

// edit a book
exports.editAutor = (req, res) => {
   db.autor.update(
     {
       name: req.body.name
     },
     {
       where: { id: req.body.id }
     }
 ).then( () => res.send("success update") );
};
