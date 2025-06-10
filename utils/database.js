// *************** IMPORT LIBRARY ***************
const mongoose = require('mongoose');

/**
 * Returns a function that connects to MongoDB using the URI from environment variables.
 * Does not connect immediately — it just provides the `connect` function to be called manually.
 */
async function connectToDatabase() {
    mongoose.set('debug', true);
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.error('MONGO_URI is not defined in environment variables.');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('Successfully connected to MongoDB.');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
}

// *************** EXPORT MODULE ***************
module.exports = connectToDatabase;