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
    minlength: 3,
    maxlength: 10,
    match: /^[a-zA-Z0-9\s]+$/ // Alphanumeric and spaces only
  },

  // Address of the school
  address: {
    type: String,
    default: null,
  },

  // Status of the school (active or deleted)
  status: {
    type: String,
    enum: ['active', 'inactive', 'deleted'],
    default: 'active',
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
module.exports = mongoose.model('School', SchoolSchema);
