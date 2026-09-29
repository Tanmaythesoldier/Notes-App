let express = require("express");
let authroutes = require("./routes/auth.routes.js");
let cookieparser = require("cookie-parser");
let notesroutes = require("./routes/notes.routes")
const cors = require("cors");
let app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieparser());
app.use(express.json());
app.use("/api/auth",authroutes);
app.use("/api/notes",notesroutes);

module.exports = app;