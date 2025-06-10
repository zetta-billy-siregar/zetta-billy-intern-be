// *************** IMPORT LIBRARY ***************
const DataLoader = require('dataloader');

// *************** IMPORT MODULE ***************
const Student = require('./student.model');

/**
 * Batch function to load students by school IDs
 * @param {Array<string>} schoolIds
 * @returns {Promise<Array<Array>>}
 */
function createStudentLoader() {
  return new DataLoader(async (schoolIds) => {
    console.log('[DataLoader] Fetching students for schoolIds:', schoolIds);

    const students = await Student.find({
      school_id: { $in: schoolIds },
      status: 'active'
    });

    // *************** Group by school_id
    const grouped = schoolIds.map(id =>
      students.filter(student => student.school_id.toString() === id.toString())
    );

    return grouped;
  });
}

// *************** EXPORT MODULE ***************
module.exports = createStudentLoader;
