// *************** IMPORT LIBRARY ***************
const DataLoader = require('dataloader');

// *************** IMPORT MODULE ***************
const School = require('./school.model');

/**
 * Batch function to load schools by IDs
 * @param {Array<string>} schoolIds
 * @returns {Promise<Array<Object>>}
 */
function createSchoolLoader() {
  return new DataLoader(async (schoolIds) => {
    console.log('[DataLoader] Fetching schools for IDs:', schoolIds);

    const schools = await School.find({ _id: { $in: schoolIds } });

    // *************** Map results by _id for ordering
    const schoolMap = {};
    schools.forEach(school => {
      schoolMap[school._id.String()] = school;
    });

    return schoolIds.map(id => schoolMap[id.String()] || null);
  });
}

// *************** EXPORT MODULE ***************
module.exports = createSchoolLoader;