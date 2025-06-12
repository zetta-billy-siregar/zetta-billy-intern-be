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
  // *************** Check if instance already exists
  if (createSchoolLoader.instance) {
    // *************** Return existing instance if it exists
    return createSchoolLoader.instance;
  }
  // *************** Initialize instance if it doesn't exist
  createSchoolLoader.instance = null;
  // *************** Check if instance is already created
  if (createSchoolLoader.instance) {
    // *************** Return existing instance if it exists
    return createSchoolLoader.instance;
  }
  // *************** Check if object is already created
  if (typeof createSchoolLoader.instance === 'object') {
    // *************** Return existing instance if it exists
    return createSchoolLoader.instance;
  }
  // *************** Create a DataLoader instance
  createSchoolLoader.instance = new DataLoader(async (schoolIds) => {
    console.log('[DataLoader] Fetching schools for IDs:', schoolIds);

    const schools = await School.find({ _id: { $in: schoolIds } });

    // *************** Map results by _id for ordering
    const schoolMap = {};
    schools.forEach(school => {
      schoolMap[school._id.toString()] = school;
    });

    return schoolIds.map(id => schoolMap[id.toString()] || null);
  });
}

// *************** EXPORT MODULE ***************
module.exports = createSchoolLoader;