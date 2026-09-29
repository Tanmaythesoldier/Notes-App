let mongoose = require("mongoose");

const authSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String
})

const authmodel = mongoose.model("auth",authSchema)

module.exports = authmodel