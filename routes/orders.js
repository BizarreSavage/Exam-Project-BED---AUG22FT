const express = require('express');
const router = express.Router();
const { Order, OrderItem, Item, User } = require('../models');
const userAndAdmin = require('../middlewares/userAndAdmin');

router.get('/', userAndAdmin, async (req, res) => {
  const { id, roleId } = req.user;

  // If the user is an admin, get all orders.
  if (roleId === 1) {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
          include: {
            model: Item,
            as: 'item'
          }
        },
        {
          model: User,
          as: 'user'
        }
      ]
    });
    return res.json(orders);
  }

  // If the user is not an admin, only get their orders.
  const orders = await Order.findAll({
    where: { userId: id },
    include: [
      {
        model: OrderItem,
        as: 'orderItems',
        include: {
          model: Item,
          as: 'item'
        }
      },
    ],
  });

  return res.json(orders);
});

module.exports = router;