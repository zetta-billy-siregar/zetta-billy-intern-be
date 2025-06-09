// *************** IMPORT LIBRARY ***************
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // Unique identifier for the user
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  // First name of the user
  first_name: {
    type: String,
    required: true,
  },

  // Last name of the user
  last_name: {
    type: String,
    required: true,
  },

  // Email address of the user, must be unique
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // Encrypted password for login authentication
  password: {
    type: String,
    required: true,
  },

  // Role of the user (e.g., admin, student, teacher)
  role: {
    type: String,
    required: true,
  },

  // Timestamp to mark soft deletion
  deleted_at: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

// *************** EXPORT MODULE ***************
module.exports = mongoose.model('User', UserSchema);
