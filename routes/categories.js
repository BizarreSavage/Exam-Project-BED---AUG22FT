const express = require('express');
const router = express.Router();
const { Category } = require('../models');

router.get('/', async (req, res) => {
  const categories = await Category.findAll();
  return res.json(categories);
});



module.exports = router;