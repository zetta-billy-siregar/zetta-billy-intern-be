// *************** IMPORT LIBRARY ***************
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchoolSchema = new Schema({
  // Unique identifier for the school
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  // Short Name of the school
  short_name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 10,
    default: '',
  },

  // Long Name of the school
  long_name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
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

  // Timestamp for when the school was created
  created_at: {
    type: Date,
    default: Date.now,
  },

  // Timestamp for when the school was last updated
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
module.exports = mongoose.model('School', SchoolSchema);
