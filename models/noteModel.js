const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
},{ timestamps: true })
module.exports = mongoose.model("Note", notesSchema)