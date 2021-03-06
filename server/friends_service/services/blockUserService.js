const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const DB_PORT = process.env.DB_PORT;

module.exports = async function blockUserService(blockInfo) {
  const result = await axios.post(
    DOMAIN_NAME + DB_PORT + '/api/friendsRoutes/block',
    blockInfo
  );
  if (result) {
    logger.debug(result.data, 'fri/ser/block');
    return result.data;
  }
  logger.error(err, 'fri/ser/block');
  return null;
};
