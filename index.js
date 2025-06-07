// *************** IMPORT LIBRARY ***************
require('dotenv').config();

// *************** IMPORT APP & DB CONNECTOR ***************
const app = require('./core/Express');
const connectToDatabase = require('./core/Database');

// *************** IMPORT MODELS ***************
require('./schema/student/student.model');
require('./schema/school/school.model');
require('./schema/user/user.model');

// *************** START SERVER AFTER DB CONNECTED ***************
async function startServer() {
    await connectToDatabase(); 

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

startServer();
