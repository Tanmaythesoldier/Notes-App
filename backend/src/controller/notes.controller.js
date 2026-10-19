let notemodel = require("../model/notes.model")

async function allnotes(req,res) {
    let user = req.user
    console.log(user)
    let allnotes = await notemodel.find({user:user})
    res.json(allnotes)
    
}

async function createnotes(req,res){
    let {title,content} = req.body
    let user = req.user
    
    let creatednote = await notemodel.create({
        user:user.id,
        title:title,
        content:content
    })
    res.status(200).json({massage:"notes created",
        note:creatednote
    })
}

async function deletenotes(req,res){
    let {id} = req.body
    let deletenote = await notemodel.findByIdAndDelete(id)
    res.status(201).json({massage:"delete your notes"})    
    
}


module.exports = {createnotes,allnotes,deletenotes}