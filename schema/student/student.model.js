// *************** IMPORT LIBRARY ***************
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// *************** DEFINE SCHEMA ***************
/**
 * Student Schema
 * This schema defines the structure for student documents in the database.
 * It includes fields for student identification, personal information, and enrollment details.
 * Each student has a unique identifier, first and last names, email, date of birth, and a reference to the school they are enrolled in.
 * The schema also includes a timestamp for soft deletion.
 * 
 * 
 * 
 * * @typedef {Object} StudentSchema
 * * @description This schema represents a student in the system with fields for personal information and enrollment.
 * * @module StudentSchema
 * * @property {ObjectId} _id - Unique identifier for the student, auto-generated.
 * * @property {String} first_name - First name of the student, required field.
 * * * @property {String} last_name - Last name of the student, required field.
 * * * @property {String} email - Email address of the student, required and must be unique.
 * * * @property {Date} date_of_birth - Date of birth of the student, defaults to null.
 * * * @property {ObjectId} school_id - Reference to the school the student is enrolled in, required field.
 * * * @property {Date} deleted_at - Timestamp for soft deletion, defaults to null.
 * * * @property {Date} createdAt - Timestamp for when the student was created, automatically managed by Mongoose.
 * * * @property {Date} updatedAt - Timestamp for when the student was last updated, automatically managed by Mongoose.
 **/

const StudentSchema = new Schema({
  // *************** Unique identifier for the student
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  // *************** First name of the student
  first_name: {
    type: String,
    required: true,
  },

  // *************** Last name of the student
  last_name: {
    type: String,
    required: true,
  },

  // *************** Email address of the student
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // *************** Date of birth of the student
  date_of_birth: {
    type: Date,
    default: null,
  },

  // *************** Reference to the school the student is enrolled in
  school_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
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
module.exports = mongoose.model('Student', StudentSchema);
