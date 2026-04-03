require('dotenv').config()
const express = require('express')
const app = express()
const port = 4200
app.use(express.json())
const mongoose = require('mongoose')

//In place of sample data of notes, we will be using MongoDB to store the notes data and perform CRUD operations on it. 

//creating a schema for the notes collection in MongoDB,we wont create seperately id for the notes because MongoDB will 
// automatically create a unique _id for each document in the collection. We will use that _id as the identifier for our
// notes instead of creating a separate id field.

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected successfully !"))
    .catch(err => console.log(err))

const notesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})
const Note = mongoose.model("Note", notesSchema)


// // example notes data
// let notes = [
//     { id: 101, name: "my_notes1" },
//     { id: 102, name: "my_notes2" },
//     { id: 103, name: "my_notes3" },
//     { id: 104, name: "my_notes4" },
//     { id: 105, name: "my_notes5" },
// ]

//decribing the routes in the notes app to perform CRUD operations

//get all notes
app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find()
        res.json(notes)
    } catch (err) {
        res.status(500).send("Error fetching notes")
    }
})

// app.get("/all_notes", (req, res) => {
//     // res.send("Get all notes")
//     res.json(notes)
// })

//get single notes
app.get("/notes/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Invalid ID")
        }
        const note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Note not found")
        }
        res.json(note)
    } catch (err) {
        res.status(500).send("Error fetching note")
    }
})
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
app.delete("/notes/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Invalid ID")
        }
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) {
            return res.status(404).send("Note not found")
        }
        res.send("Note deleted successfully")
    } catch (err) {
        res.status(500).send("Error deleting note")
    }
})

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
app.put("/notes/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Invalid ID")
        }
        if (!req.body.name) {
            return res.status(400).send("Name is required")
        }
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
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
})

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
app.post('/notes', async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(400).send("Name is required")
        }
        const newNote = new Note({
            name: req.body.name
        })
        const savedNote = await newNote.save()
        res.json(savedNote)
    } catch (err) {
        return res.status(500).send("Error is saving notes to the database")
    }
})


//check for server
app.listen(port, () => {
    console.log(`Server is running successfully at ${port}`)
})