let mongoose = require("mongoose");

 function connecttoDB(){
     mongoose.connect(process.env.CONNECT_TO_DB)
    .then(()=>{
        console.log("connect to DB");
    })
    .catch((ERROR)=>{
        console.log("failed to connect to DB", ERROR);
    })
}
module.exports = connecttoDB