const express = require("express");
const autorController = require("../controllers/autorController.js");
const autorRouter = express.Router();

autorRouter.get("/", autorController.getAutors);
autorRouter.post("/create", autorController.postAutor);
autorRouter.get("/find/:id", autorController.getAutorWithId);
autorRouter.delete("/delete/:id", autorController.deleteAutor);
autorRouter.put("/edit", autorController.editAutor);

module.exports = autorRouter;
