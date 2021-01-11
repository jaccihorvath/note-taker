// dependencies
const express = require('express');
const path = require('path');
const db = require('../Develop/db/db.json')
const uniqid = require('uniqid');

// express
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// routes
require('./routes/api')(app);
require('./routes/html')(app);

// start server
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});