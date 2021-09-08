const express = require("express");
const homeController = require("../controllers/homeController.js");
const homeRouter = express.Router();

//userRouter.use("/create", userController.addUser);
homeRouter.get("/create", homeController.getForm);

module.exports = homeRouter;
