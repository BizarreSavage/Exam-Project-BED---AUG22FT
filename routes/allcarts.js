const express = require('express');
const router = express.Router();
const onlyAdmin = require('../middlewares/onlyAdmin');
const { sequelize } = require('../models');


router.get('/', onlyAdmin, async (req, res) => {
  const allCarts = await sequelize.query(`
    SELECT DISTINCT
      carts.*,
      users.username,
      users.firstname,
      users.lastname,
      items.*
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