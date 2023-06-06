var express = require('express');
var router = express.Router();
const { User } = require('../models');
const onlyAdmin = require('../middlewares/onlyAdmin');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.delete('/:id', onlyAdmin, async (req, res, next) => {
  try {
    const user = await User.destroy({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).json({ message:'User deleted'});
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
});

module.exports = router;
