let mongoose = require("mongoose")

const noteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title:String,
    content:String
})

let notesmodel = mongoose.model("notes",noteSchema)

module.exports = notesmodel