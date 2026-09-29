require("dotenv").config();
let app = require("./src/app.js");
let connecttoDB = require("./src/db/db")

connecttoDB()

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});