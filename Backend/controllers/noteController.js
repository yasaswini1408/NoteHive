const Note = require('../models/noteModel')
const mongoose = require('mongoose')

//decribing the routes in the notes app to perform CRUD operations

//get all notes by using query parameters for searching, pagination and sorting
exports.getAllNotes = async (req, res) => {
    try {
        const search = req.query.search?.trim()
        const page = Number(req.query.page) || 1
        const limit = req.query.limit ? Number(req.query.limit) : null
        const sort = req.query.sort || "desc"
        const skip = limit ? (page - 1) * limit : 0
        let query = { user: req.user.userId }  

        //Search
        if (search) {
            query.name = { $regex: search, $options: 'i' }
        }

        //Sorting
        let sortOption = {}
        if (sort === "asc") {
            sortOption = { name: 1 }   //a->z
        } else {
            sortOption = { name: -1 }  //z->a
        }

        //Build query
        let queryBuilder = Note.find(query).sort(sortOption)

        //Apply pagination only if limit exists
        if (limit) {
            queryBuilder = queryBuilder.skip(skip).limit(limit)
        }
        const notes = await queryBuilder
        const total = await Note.countDocuments(query)
        res.json({
            total,
            page: limit ? page : null,
            limit: limit,
            notes
        })
    } catch (err) {
        res.status(500).send("Error fetching notes")
    }
}

// app.get("/all_notes", (req, res) => {
//     // res.send("Get all notes")
//     res.json(notes)
// })

//get single notes
exports.getNoteById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Invalid ID")
        }
        const note = await Note.findOne({
            _id: req.params.id,
            user: req.user.userId
        })
        if (!note) {
            return res.status(404).send("Note not found")
        }
        res.json(note)
    } catch (err) {
        res.status(500).send("Error fetching note")
    }
}
// app.get("/notes/:id", (req, res) => {
//     // res.send(`Get notes with id : ${req.params.id}`)
//     let foundNote = null;
//     for (let note of notes) {
//         if (note.id == req.params.id) {
//             foundNote = note;
//             break;
//         }
//     }
//     if (!foundNote) {
//         return res.status(404).send("Note not found");
//     }
//     res.json(foundNote);
// })


//delete a note with id
exports.deleteNote = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Invalid ID")
        }
        const deletedNote = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId 
        })
        if (!deletedNote) {
            return res.status(404).send("Note not found")
        }
        res.send("Note deleted successfully")
    } catch (err) {
        res.status(500).send("Error deleting note")
    }
}

// app.delete("/notes/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const exists = notes.some(note => note.id === id);
//     if (!exists) {
//         return res.status(404).send("Note not found");
//     }
//     notes = notes.filter(note => note.id !== id);
//     res.send("Note deleted successfully");
// })

// app.delete("/notes/:id", (req, res) => {
//     // res.send(`Notes with id : ${req.params.id} has been deleted successfully`)
//     for (let i = 0; i < notes.length; i++) {
//         if (notes[i].id == req.params.id) {
//             notes.splice(i, 1);
//             break;
//         }
//     }
// })

//update a note with id and also update the name of the note
exports.updateNote = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Invalid ID")
        }
        if (!req.body.name) {
            return res.status(400).send("Name is required")
        }
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user.userId },   
            { name: req.body.name },
            { new: true }
        )
        if (!updatedNote) {
            return res.status(404).send("Note not found")
        }
        res.json(updatedNote)
    } catch (err) {
        res.status(500).send("Error updating note")
    }
}

// app.put("/update_notes/:id", (req, res) => {
//     // res.send(`Updating the notes with id: ${req.params.id}`)
//     let foundNote = null;
//     for (let note of notes) {
//         if (note.id == req.params.id) {
//             foundNote = note;
//             foundNote.name = "Updated_notes"
//             break;
//         }
//     }
//     if (!foundNote) {
//         return res.status(404).send("Note not found");
//     }
//     res.json(foundNote);
// })

//create a new note
exports.createNote = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send("Name is required")
        }
        const newNote = new Note({
            name: req.body.name,
            user: req.user.userId
        })
        const savedNote = await newNote.save()
        res.json(savedNote)
    } catch (err) {
        return res.status(500).send("Error is saving notes to the database")
    }
}



