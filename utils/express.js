// *************** IMPORT LIBRARY ***************
const express = require('express');
const app = express();

// *************** Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// *************** Logging Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// *************** Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// *************** EXPORT MODULE ***************
module.exports = app;
