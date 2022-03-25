const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const DB_PORT = process.env.DB_PORT;

module.exports = async function removeFriend(userId) {
  const result = await axios.post(DOMAIN_NAME + DB_PORT + '/api/friendsRoutes/removefriend', userId);
  if (result) {
    logger.debug(result.data, 'fri/ser/removefriend', 'user removed from friends:');
    return result.data;
  }
  logger.error(`user id[${userId}] not found`, 'fri/ser/removefriend');
  return null;
};
