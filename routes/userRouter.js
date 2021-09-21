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

userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/welcome", auth, userController.successAuth);

userRouter.get("/findByFirstName", userController.getUserByFirstName);

module.exports = userRouter;
