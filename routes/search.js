const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const { Item, Category } = require('../models');

router.post('/', async (req, res) => {
  try {
    const { item_name, category_name, sku } = req.body;

    let whereClause = {};
    if (item_name) {
      whereClause.name = { [Op.like]: `%${item_name}%` };
    }
    if (sku) {
      whereClause.sku = sku;
    }

    let items = await Item.findAll({
      where: whereClause,
      include: [
        {
          model: Category,
          as: 'category',
          where: category_name ? { name: category_name } : undefined,
        },
      ],
    });

    return res.json({ items });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;