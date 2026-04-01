const express = require('express')
const app = express()
const port = 4200
app.use(express.json())

// example users

let notes = [
    { id: 101, name: "my_notes1" },
    { id: 102, name: "my_notes2" },
    { id: 103, name: "my_notes3" },
    { id: 104, name: "my_notes4" },
    { id: 105, name: "my_notes5" },
]

//decribing the routes in the notes app to perform CRUD operations

//get all notes
app.get("/all_notes", (req, res) => {
    // res.send("Get all notes")
    res.json(notes)
})

//get single notes
app.get("/notes/:id", (req, res) => {
    // res.send(`Get notes with id : ${req.params.id}`)
    let foundNote = null;
    for (let note of notes) {
        if (note.id == req.params.id) {
            foundNote = note;
            break;
        }
    }
    if (!foundNote) {
        return res.status(404).send("Note not found");
    }
    res.json(foundNote);
})

// app.delete("/notes/:id", (req, res) => {
//     // res.send(`Notes with id : ${req.params.id} has been deleted successfully`)
//     for (let i = 0; i < notes.length; i++) {
//         if (notes[i].id == req.params.id) {
//             notes.splice(i, 1);
//             break;
//         }
//     }
// })

//delete a note with id
app.delete("/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    const exists = notes.some(note => note.id === id);
    if (!exists) {
        return res.status(404).send("Note not found");
    }
    notes = notes.filter(note => note.id !== id);
    res.send("Note deleted successfully");
})

//update a note with id
app.put("/update_notes/:id", (req, res) => {
    // res.send(`Updating the notes with id: ${req.params.id}`)
    let foundNote = null;
    for (let note of notes) {
        if (note.id == req.params.id) {
            foundNote = note;
            foundNote.name = "Updated_notes"
            break;
        }
    }
    if (!foundNote) {
        return res.status(404).send("Note not found");
    }
    res.json(foundNote);
})

//create a new note
app.post('/notes', (req, res) => {
    if (!req.body.name) {
        return res.status(400).send("Name is required");
    }
    const newNote = {
        id: Date.now(),
        name: req.body.name
    }
    notes.push(newNote)
    res.json(newNote);
})

//check for server
app.listen(port, () => {
    console.log(`server is running successfully at ${port}`)
})