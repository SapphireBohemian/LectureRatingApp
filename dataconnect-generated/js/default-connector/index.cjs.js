const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'LectureRatingApp',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

