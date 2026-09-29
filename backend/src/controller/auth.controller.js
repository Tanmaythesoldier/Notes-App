let authmodel = require("../model/auth.model")
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
const { use } = require("react")


async function register(req,res){

    let {username,email,password} = req.body

    let userexist = await authmodel.findOne({email:email})
    
    if(userexist){
        return res.json("user is alrady exist")
    }
    let hashedPassword = await bcrypt.hash(password,10)

    let createuser = await authmodel.create({
        username,
        email,
        password:hashedPassword
    })
    let token = jwt.sign({id:createuser.id},process.env.JWT_SCRIT)
    res.cookie("token",token)
    res.status(201).json({massage:"user have register"})
}

async function login(req,res){

    let {email,password} = req.body

    let user = await authmodel.findOne({email:email})
    

    if(!user){
        return res.status(401).json({massage:"plese register first"})
    }

    let comparepass = await bcrypt.compare(password,user.password)

    if(!comparepass){
        return res.status(401).json({massage:"Invalid password"})
    }

    let token = jwt.sign({id:user.id},process.env.JWT_SCRIT)

    res.cookie("token",token,{
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.status(200).json({massage:"user is login"})
    

}

async function logout(req,res) {

    res.clearCookie("token");
    res.status(200).json({massage:"Logout sucessfully"})

    
}
module.exports = {register,login,logout}