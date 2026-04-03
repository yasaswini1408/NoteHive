require('dotenv').config()
const express = require('express')
const app = express()
const port = 4200
app.use(express.json())
const mongoose = require('mongoose')

const noteRoutes = require('./routers/noteRoutes')
// app.use('/notes', noteRoutes)

// //In place of sample data of notes, we will be using MongoDB to store the notes data and perform CRUD operations on it. 

// //creating a schema for the notes collection in MongoDB,we wont create seperately id for the notes because MongoDB will 
// // automatically create a unique _id for each document in the collection. We will use that _id as the identifier for our
// // notes instead of creating a separate id field.

// mongoose.connect(process.env.MONGO_URL)
//     .then(() => console.log("MongoDB connected successfully !"))
//     .catch(err => console.log(err))


// // // example notes data
// // let notes = [
// //     { id: 101, name: "my_notes1" },
// //     { id: 102, name: "my_notes2" },
// //     { id: 103, name: "my_notes3" },
// //     { id: 104, name: "my_notes4" },
// //     { id: 105, name: "my_notes5" },
// // ]


// //check for server
// app.listen(port, () => {
//     console.log(`Server is running successfully at ${port}`)
// })

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected successfully !")

        app.use('/notes', noteRoutes)

        app.listen(port, () => {
            console.log(`Server is running successfully at ${port}`)
        })
    })
    .catch(err => console.log(err))