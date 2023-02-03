const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

let notes = require(`${path.join(__dirname,'public')}/db/db.json`);

// GET route
app.get('/api/notes', (req, res) => {
  
    // Renumber index for each note
    notes.forEach((note, index) => {
        note.id = index + 1;
    })
  
    // Return the entire DB
    res.status(200).json(notes);

});


// POST route
app.post('/api/notes', async (req, res) => {

    const { title, text } = req.body;

    // Create new Note object with an ID and append to Notes
    const newNote = {
        title,
        text,
        id: notes.length
    }

    notes.push(newNote);
    
    // Renumber index for each note
    notes.forEach((note, index) => {
        note.id = index + 1;
    })

    const noteToWrite = JSON.stringify(notes);

    await fs.writeFile(`${path.join(__dirname,'public')}/db/db.json`, noteToWrite, (err) =>{
        err ? console.log(err) : console.log(`Wrote to DB successfully.`);
    });


    res.status(200).json(newNote);
  
  });

// DELETE route
app.delete('/api/notes/:id', async (req, res) => {

    // Create boolean to track if ID was found or not 
    let foundId = false;

    // Check each note in the DB to see if the ID matches. If so, delete the ID from the DB
    notes.forEach((note) => {
    if(note.id === parseInt(req.params.id)) {
        notes.splice(req.params.id-1, 1)
        foundId = true;
    };
    })


    // If ID is not found, return an error
    if(!foundId) {
        res.status(400).json('Please enter a valid ID');
        return;
    }

    // Renumber index for each note
    notes.forEach((note, index) => {
        note.id = index + 1;
    })

    const noteToWrite = JSON.stringify(notes);
    

    await fs.writeFile(`${path.join(__dirname,'public')}\\db\\db.json`, noteToWrite,  (err) =>{
        err ? console.log(err) : console.log(`Deleted from DB successfully.`);
    });

    res.status(200).json(`ID ${req.params.id} deleted.`);
});


// Open Port
app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);

module.exports = app;
