// *************** IMPORT LIBRARY ***************
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// *************** DEFINE SCHEMA ***************
/**
 * User Schema 
 * This schema defines the structure for user documents in the database.
 * It includes fields for user identification, authentication, and role management.
 * Each user has a unique identifier, first and last names, email, password, role, and a timestamp for soft deletion.
 * The schema also includes timestamps for creation and updates.
 *  
 *  
 *  
 * * @typedef {Object} UserSchema
 * * @description This schema represents a user in the system with fields for personal information, authentication, and role.
 * * @module UserSchema
 * * * @property {ObjectId} _id - Unique identifier for the user, auto-generated.   
 * * * @property {String} first_name - First name of the user, required field.
 * * * @property {String} last_name - Last name of the user, required field.
 * * * @property {String} email - Email address of the user, required and must be unique.
 * * * @property {String} password - Encrypted password for user authentication, required field.
 * * * @property {String} role - Role of the user (e.g., admin, student, teacher), required field.
 * * * @property {Date} deleted_at - Timestamp for soft deletion, defaults to null.
 * * * @property {Date} createdAt - Timestamp for when the user was created, automatically managed by Mongoose.
 * * * @property {Date} updatedAt - Timestamp for when the user was last updated, automatically managed by Mongoose.   
 **/


const UserSchema = new Schema({
  // *************** Unique identifier for the user
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  // *************** First name of the user
  first_name: {
    type: String,
    required: true,
  },

  // *************** Last name of the user
  last_name: {
    type: String,
    required: true,
  },

  // *************** Email address of the user, must be unique
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // *************** Encrypted password for login authentication
  password: {
    type: String,
    required: true,
  },

  // *************** Role of the user (e.g., admin, student, teacher)
  role: {
    type: String,
    required: true,
  },

  // *************** Timestamp to mark soft deletion
  deleted_at: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

// *************** EXPORT MODULE ***************
module.exports = mongoose.model('User', UserSchema);
