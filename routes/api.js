// dependencies
const db = require('../db/db.json')
const fs = require('fs');
const uniqid = require('uniqid');


// routes
module.exports = function(app) {

    // GET -- retrieving notes and returning notes as JSON
    app.get('/api/notes', function(req, res) {
        res.json(data);
    });

    // POST -- adding new note to array
    app.post('/api/notes', function(req, res) {
        // setting unique id to note
        let id = uniqid();
        // building note object
        let newNote = {
            id: id,
            title: req.body.title,
            text: req.body.text
        };

        fs.readFile(db, "utf-8", (err, data) => {
            if (err) throw err;

            const notes = JSON.parse(data);
            // adding new note to array
            notes.push(newNote);

            // writing to db
            fs.writeFile(db, JSON.stringify(notes), "utf-8", (err) => {
                if (err) throw err;
                res.send(db);
                console.log("New note created")
            });
        });
    });

    // DELETE -- deleting a saved note
    app.delete('/api/notes/:id', function (req, res) {
        fs.readFile(db, "utf-8", (err, data) => {
            if (err) throw err;

            // finds note with selected id and removes from array
            let id = req.params.id;
            const notes = JSON.parse(data);
            const newNotes = notes.filter(notes => notes.id != id);

            // rewrites new note array to db
            fs.writeFile(db, JSON.stringify(newNotes), "utf-8", (err) => {
                if (err) throw err;
                res.send(db);
                console.log("Your note has been deleted.")
            });
        });
    });
};