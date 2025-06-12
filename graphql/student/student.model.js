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
    trim: true,
    lowercase: true,
  },

  // Date of birth of the student
  date_of_birth: {
    type: Date,
    default: null,
  },

  // Status of the student is pending by default, can be 'active', 'inactive' or 'deleted'
  status:{
    type: String,
    enum: ['pending', 'active', 'deleted'],
    default: 'pending',
  },

  // Reference to the school the student is enrolled in
  school_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },

  // Timestamp for when the student was created
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Timestamp for when the student was last updated
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  // Timestamp to mark soft deletion
  deletedAt: {
    type: Date,
    default: null,
  },
});

// *************** EXPORT MODULE ***************
module.exports = mongoose.model('Student', StudentSchema);
