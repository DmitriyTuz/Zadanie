const express = require("express");
const bookController = require("../controllers/bookController.js");
const bookRouter = express.Router();

bookRouter.get("/", bookController.getBooks);
bookRouter.post("/create", bookController.postBook);
bookRouter.get("/find/:id", bookController.getBookWithId);
bookRouter.delete("/delete/:id", bookController.deleteBook);
bookRouter.put("/edit", bookController.editBook);

module.exports = bookRouter;
