// dependencies
const db = require('../db/db.json')
const fs = require('fs');
const uniqid = require('uniqid');
const path = require('path');

const dbPath = 'db/db.json';

// routes
module.exports = function(app) {

    // GET -- retrieving notes and returning notes as JSON
    app.get('/api/notes', function(req, res) {
        fs.readFile(dbPath, "utf-8", (err, data) => {
            if (err) throw err;

            let notes = JSON.parse(data);
            res.json(notes);
        });
    });

    // POST -- adding new note to array
    app.post('/api/notes', function(req, res) {
        fs.readFile(dbPath, "utf-8", (err, data) => {
            if (err) throw err;

            // setting unique id to note
            let id = uniqid();

            // building note object
            let notes = JSON.parse(data);

            let newNote = {
                id: id,
                title: req.body.title,
                text: req.body.text
            };

            console.log(newNote);


            // adding new note to array
            notes.push(newNote);

            // writing to db
            fs.writeFile(dbPath, JSON.stringify(notes), "utf-8", (err, data) => {
                if (err) throw err;
                console.log("New note created");
            });
            
            res.send(notes);

        });
    });

    // DELETE -- deleting a saved note
    app.delete('/api/notes/:id', function (req, res) {
        fs.readFile(dbPath, "utf-8", (err, data) => {
            if (err) throw err;

            // finds note with selected id and removes from array
            let id = req.params.id;
            let notes = JSON.parse(data);
            const newNotes = notes.filter(notes => notes.id != id);

            // rewrites new note array to db
            fs.writeFile(dbPath, JSON.stringify(newNotes), "utf-8", (err) => {
                if (err) throw err;
                res.json(newNotes);
                console.log("Your note has been deleted.")
            });
        });
    });
};