let jwt = require("jsonwebtoken")
let authmodel = require("../model/auth.model")
async function middleware(req,res,next){

    let toke = req.cookies.token
    
    if(!toke){
       return res.status(401).json("plese login ")
    }

    let user = await jwt.verify(toke,process.env.JWT_SCRIT)
    
  let userexist = await authmodel.findById(user.id)

  req.user = userexist
  next()

} 
module.exports = {middleware}