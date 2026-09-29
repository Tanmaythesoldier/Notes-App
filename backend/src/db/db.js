let mongoose = require("mongoose");

function connecttoDB(){
    mongoose.connect(process.env.CONNECT_TO_DB)
    .then(()=>{
        console.log("connect to DB");
    })
    .catch(()=>{
        console.log("failed to connect to DB");
    })
}
module.exports = connecttoDB