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
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Basic email validation
    trim: true,
    lowercase: true,
  },

  // Date of birth of the student
  date_of_birth: {
    type: Date,
    default: null,
  },

  // Status of the student, can be 'active' or 'deleted'
  status:{
    type: String,
    enum: ['pending', 'active', 'inactive', 'deleted'],
    default: 'pending',
  },

  // Reference to the school the student is enrolled in
  school_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },

  // Timestamp for when the student was created
  created_at: {
    type: Date,
    default: Date.now,
  },

  // Timestamp for when the student was last updated
  updated_at: {
    type: Date,
    default: Date.now,
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
