const express = require('express');
const router = express.Router();
const { Item, Category } = require('../models');

router.get('/', async (req, res) => {
    const items = await Item.findAll({
        include: [{ model: Category, as: 'category' }]
    });
    return res.json(items);
  });

  
  module.exports = router;