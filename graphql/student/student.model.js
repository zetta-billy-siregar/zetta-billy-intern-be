// *************** IMPORT LIBRARY ***************
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  // Unique identifier for the student
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  // First name of the student
  first_name: {
    type: String,
    required: true,
  },

  // Last name of the student
  last_name: {
    type: String,
    required: true,
  },

  // Email address of the student
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // Date of birth of the student
  date_of_birth: {
    type: Date,
    default: null,
  },

  // Status of the student, can be 'active' or 'deleted'
  status:{
    type: String,
    enum: ['active', 'deleted'],
    default: 'active',
  },

  // Reference to the school the student is enrolled in
  school_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
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
module.exports = mongoose.model('Student', StudentSchema);
