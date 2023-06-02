const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');
const onlyAdmin = require('../middlewares/onlyAdmin');

router.get('/', onlyAdmin, async (req, res) => {
    const allOrders = await sequelize.query(`
  SELECT DISTINCT
    orders.id,
    orders.userId,
    orders.status,
    orders.createdAt,
    orders.updatedAt,
    users.username,
    users.firstname,
    users.lastname
  FROM
    orders
  LEFT JOIN
    users ON orders.userId = users.id
  LEFT JOIN
    orderItems ON orders.id = orderItems.orderId
  LEFT JOIN
    items ON orderItems.itemId = items.id
`);

  return res.json(allOrders);
});

module.exports = router;