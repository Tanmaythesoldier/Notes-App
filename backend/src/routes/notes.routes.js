let express = require("express");
let routes = express.Router();
let {middleware} = require("../middleware/notes.middleware")
let notescontroller = require("../controller/notes.controller")

routes.post("/addnotes",middleware,notescontroller.createnotes)
routes.get("/allnotes",middleware,notescontroller.allnotes)
routes.delete("/deletenotes",middleware,notescontroller.deletenotes)

module.exports = routes