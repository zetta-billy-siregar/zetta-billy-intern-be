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
  },

  // Address of the school
  address: {
    type: String,
    default: null,
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
