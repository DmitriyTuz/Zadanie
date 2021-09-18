const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter1 = express.Router();

userRouter1.get("*", userController.wrongRoute);

module.exports = userRouter1;