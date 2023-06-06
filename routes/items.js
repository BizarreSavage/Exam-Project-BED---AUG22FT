const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Item, Category } = require('../models');
const userAndAdmin = require('../middlewares/userAndAdmin');

router.get('/', userAndAdmin, async (req, res) => {
  if (req.user === null) {
    // If user is not logged in, show only in-stock items
    const items = await Item.findAll({
      include: [{ model: Category, as: 'category' }],
      where: {
        stock: {
          [Op.gt]: 0,
        },
      },
    });
    return res.json(items);
  } else {
    // If user is logged in, show all items
    const items = await Item.findAll({
      include: [{ model: Category, as: 'category' }],
    });
    return res.json(items);
  }
});

module.exports = router;