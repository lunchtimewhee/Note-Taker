const express = require('express');

const PORT = 3001;

const app = express();

let notes = require('./db/db.json');


// GET request for reviews
app.get('/api/notes', (req, res) => {
  // Inform the client
  res.status(200).json(notes);

  // Log our request to the terminal
  console.info(`${res.body} request received to get reviews`);
});

// POST request
app.post('/api/notes', (req, res) => {
    // Inform the client that their POST request was received

    const { title, text } = req.body;

    const newNote = {
        title,
        text,
        id: notes.length
    }

    notes.push(newNote);


    res.status(200).json(newNote);
  
  });

// DELETE request
app.delete('/api/notes/:id', (req, res) => {
  // Inform the client that their POST request was received
  notes.forEach((note) => {
    if(note.id === id) {
        notes.splice(id-1, 1)
    };
  })

  notes.forEach((note, index) => {
    note.id = index + 1;
  })
  
  res.status(200).json(`${id} deleted.`);
});

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
