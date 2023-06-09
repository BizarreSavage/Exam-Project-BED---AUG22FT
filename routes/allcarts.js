const express = require('express');
const router = express.Router();
const onlyAdmin = require('../middlewares/onlyAdmin');
const { sequelize } = require('../models');

router.get('/', onlyAdmin, async (req, res) => {
  const allCarts = await sequelize.query(`
    SELECT
      carts.*,
      users.username,
      users.firstname,
      users.lastname,
      COALESCE(items.name, 'Empty basket') AS item_name,
      COALESCE(items.img_url, 'Empty basket') AS item_img_url,
      COALESCE(items.sku, 'Empty basket') AS item_sku,
      COALESCE(items.price, 'Empty basket') AS item_price,
      COALESCE(items.stock, 'Empty basket') AS item_stock,
      COALESCE(items.categoryId, 'Empty basket') AS item_categoryId,
      COALESCE(cartItems.quantity, 'Empty basket') AS item_quantity
    FROM
      carts
    LEFT JOIN
      users ON carts.userId = users.id
    LEFT JOIN
      cartItems ON carts.id = cartItems.cartId
    LEFT JOIN
      items ON cartItems.itemId = items.id
  `);
  return res.json(allCarts);
});

module.exports = router;
