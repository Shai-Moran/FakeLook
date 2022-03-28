const axios = require('axios');
const logger = require('../../logger');

const DOMAIN_NAME = process.env.DOMAIN_NAME;
const DB_PORT = process.env.DB_PORT;

module.exports = async function getCommentsService(data) {
  try {
    const result = await axios.post(
      DOMAIN_NAME + DB_PORT + '/api/postsRoutes/getComments',
      data
    );
    return result.data;
  } catch (err) {
    logger.error(err, '/post_service/services/getCommentsService');
  }
};
