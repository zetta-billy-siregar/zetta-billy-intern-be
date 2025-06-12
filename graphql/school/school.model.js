// *************** IMPORT LIBRARY ***************
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
  // Unique identifier for the school
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  // Name of the school
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    default: '',
  },

  // Address of the school
  address: {
    type: String,
    default: null,
  },

  // Status of the school (active or deleted)
  status: {
    type: String,
    enum: ['active', 'deleted'],
    default: 'active',
  },

  // Reference to the students enrolled in the school
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],

  // Timestamp for when the school was created
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Timestamp for when the school was last updated
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
module.exports = mongoose.model('School', SchoolSchema);
