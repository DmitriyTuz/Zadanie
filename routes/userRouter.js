const express = require("express");
const bodyParser = require("body-parser");

const userController = require("../controllers/userController.js");
const userRouter = express.Router();

const urlencodedParser = bodyParser.urlencoded({extended: false});

userRouter.get("/", userController.getUsers);
userRouter.post("/create", userController.postUser);
userRouter.get("/find/:id", userController.getUserWithId);
userRouter.delete("/delete/:id", userController.deleteUser);
userRouter.put("/edit", userController.editUser);

module.exports = userRouter;
