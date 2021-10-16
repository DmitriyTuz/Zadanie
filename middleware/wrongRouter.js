const express = require("express");    // оба wrongRouter работают
const wrongRouter = express.Router();

let wrongRoute = (req, res) => {
        res.status(404).json({
            success: "false",
            message: "Page not found",
            error: {
                statusCode: 404,
                message: "You reached a route that is not defined on this server",
            },
        });
};

wrongRouter.get("*", wrongRoute);

module.exports = wrongRouter;