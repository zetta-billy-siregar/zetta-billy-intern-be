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
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Basic email validation
    trim: true,
    lowercase: true,
  },

  // Encrypted password for login authentication
  password: {
    type: String,
    required: false,
  },

  // Role of the user (e.g., admin, student, teacher)
  role: {
    type: String,
    required: true,
  },

  // Overall status of the user (e.g., active, deleted)
  status: {
    type: String,
    enum: ['active', 'deleted'],
    default: 'active',
  },

  // Timestamp for when the user was created
  created_at: {
    type: Date,
    default: Date.now,
  },

  // Timestamp for when the user was last updated
  updated_at: {
    type: Date,
    default: Date.now,
  },

  // Timestamp to mark soft deletion
  deleted_at: {
    type: Date,
    default: null,
  },
});

// *************** EXPORT MODULE ***************
module.exports = mongoose.model('User', UserSchema);
