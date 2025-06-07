// *************** IMPORT LIBRARY ***************
const express = require('express');
const app = express();

// *************** Middleware ***************
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// *************** Logging Middleware ***************
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// *************** Sample route ***************
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// *************** EXPORT MODULE ***************
module.exports = app;
