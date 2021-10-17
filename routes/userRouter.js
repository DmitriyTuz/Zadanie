const express = require("express");
const bodyParser = require("body-parser");

const userController = require("../controllers/userController.js");
const userRouter = express.Router();
const auth = require("../middleware/auth");

const urlencodedParser = bodyParser.urlencoded({extended: false});

userRouter.get("/", userController.getUsers);
userRouter.post("/create", userController.postUser);
userRouter.get("/find/:id", userController.getUserWithId);
userRouter.delete("/delete/:id", userController.deleteUser);

userRouter.put("/edit", userController.editUser);
userRouter.put("/addBookToUser", userController.addBookToUser);
userRouter.put("/comeBackBookFromUser", userController.comeBackBookFromUser);

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/welcome", auth, userController.successAuth);

userRouter.get("/findById", userController.getUserById);
userRouter.get("/findByFirstNameLastName", userController.getUserByFirstNameLastName);
userRouter.get("/findByFirstNameLastNameLike", userController.getUserByFirstNameLastNameLike);

module.exports = userRouter;
