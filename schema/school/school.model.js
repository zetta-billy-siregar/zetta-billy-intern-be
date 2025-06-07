// *************** IMPORT LIBRARY ***************
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// *************** DEFINE SCHEMA ***************
/**
 * school Schema
 * This schema defines the structure for school documents in the database.
 * It includes fields for school identification, name, address, and a timestamp for soft deletion.
 * Each school has a unique identifier, a name, an optional address, and a timestamp for when it was soft deleted.
 * 
 * * @typedef {Object} SchoolSchema
 * * @description This schema represents a school in the system with fields for identification, name, and address.
 * * @module SchoolSchema
 * * * @property {ObjectId} _id - Unique identifier for the school, auto-generated.
 * * * @property {String} name - Name of the school, required field.
 * * * @property {String} address - Address of the school, optional field.
 * * * @property {Date} deleted_at - Timestamp for soft deletion, defaults to null.
 * * * @property {Date} createdAt - Timestamp for when the school was created, automatically managed by Mongoose.
 * * * @property {Date} updatedAt - Timestamp for when the school was last updated, automatically managed by Mongoose.
 **/

const SchoolSchema = new Schema({
  // *************** Unique identifier for the school
  _id: {
    type: Schema.Types.ObjectId,
    auto: true
  },

  // *************** Name of the school
  name: {
    type: String,
    required: true,
  },

  // *************** Address of the school
  address: {
    type: String,
    default: null,
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
module.exports = mongoose.model('School', SchoolSchema);
