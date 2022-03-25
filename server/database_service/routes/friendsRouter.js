const router = require('express').Router();
const logger = require('../../logger');
const User = require('../models/User');

router.route('/search').post(async (req, res) => {
  logger.info(JSON.stringify(req.body), 'db/rou/fri/search', 'Search requst');
  const input = req.body.input;
  const currentUserId = req.body.user_id;
  const users = await User.find();
  const fltered = users.filter((x) => x.username.includes(input) && x._id.toString() !== currentUserId);

  const tmp = fltered.map((x) => {
    return { _id: x._id, nickname: x.nickname, image_id: x.image_id };
  });
  logger.debug(tmp, 'db/rou/fri/search', 'Users that found');
  res.send(tmp);
});

router.route('/profile').post(async (req, res) => {
  const userId = req.body.user_id;
  logger.info(JSON.stringify(userId), 'db/rou/fri/profile', 'profile requst');
  const user = await User.findOne({ _id: userId });
  const tmp = {
    _id: user._id,
    image_id: user.image_id,
    nickname: user.nickname,
    bio: user.bio,
    friends_id: user.friends_id,
    posts: user.posts,
  };
  logger.debug(tmp, 'db/rou/fri/profile', 'profile found');
  res.send(tmp);
});

module.exports = router;