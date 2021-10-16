const db = require("../models/db");
// get all autors
exports.getAutors = (req, res) => {
    db.autor.findAll().then(books => res.send(books));
};

// post new autor
exports.postAutor = (req, res) => {
    db.autor.create({
       name: req.body.name
    }).then(submitedBook => res.send(submitedBook));
};

// get single autor by id
exports.getAutorWithId = (req, res) => {
    db.autor.findAll({
      where: {
        id: req.params.id
      }
    }).then(book => res.send(book));
};

// delete autor
exports.deleteAutor = (req, res) => {
    db.autor.destroy({
    where: {
      id: req.params.id
    }
  }).then((autor) => res.send("success delete"));
};

// edit a autor
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
