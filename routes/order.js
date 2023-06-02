const express = require('express');
const router = express.Router();
const { Cart, CartItem, Item, Order, OrderItem } = require('../models');
const userAndAdmin = require('../middlewares/userAndAdmin');
const onlyAdmin = require('../middlewares/onlyAdmin');


  router.post('/:id', userAndAdmin, async (req, res) => {
    const { id } = req.params; 
  
    try {
      const item = await Item.findByPk(id);
      if (!item) {
        return res.status(400).json({ message: 'Item not found' });
      }
  
      // Retrieve the cart for the user
      const cart = await Cart.findOne({
        where: {
          userId: req.user.id,
        },
        include: {
          model: CartItem,
          as: 'cartItems',
          where: {
            itemId: id,
          },
        },
      });
  
      if (!cart || !cart.cartItems.length) {
        return res.status(400).json({ message: 'Item not found in the cart' });
      }
  
      const cartItem = cart.cartItems[0];
      const quantity = cartItem.quantity;
  
      // Check if the item's stock is sufficient for the order
      if (item.stock < quantity) {
        return res.status(400).json({ message: 'Not enough stock for the item' });
      }
  
      const order = await Order.create({
        userId: req.user.id,
        status: 'In Process',
      });
  
      const orderItem = await OrderItem.create({
        orderId: order.id,
        itemId: id,
        price: item.price,
        quantity,
      });
  
      // Update the item's stock
      item.stock -= quantity;
      await item.save();
  
      // Clear the cart item
      await cartItem.destroy();
  
      return res.json(orderItem);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });

router.put('/:id', onlyAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(400).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    return res.json(order);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;