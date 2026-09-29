let express = require("express");
let routes = express.Router();
let authcontroller = require("../controller/auth.controller");
const { middleware } = require("../middleware/notes.middleware");

routes.post("/register",authcontroller.register)
routes.post("/login",authcontroller.login)
routes.post("/logout",middleware,authcontroller.logout)
module.exports = routes;