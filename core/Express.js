// *************** IMPORT LIBRARY ***************
const express = require('express');
const app = express();
const port = 3000;

// ************** Middleware to parse JSON bodies
app.use(express.json());
// ************** Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// ************** Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
    }
);
// ************** Sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
// ************** Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

