const express = require('express');
const router = express.Router();
const { Cart, CartItem, Item, Order, OrderItem, User } = require('../models');
const userAndAdmin = require('../middlewares/userAndAdmin');
const onlyAdmin = require('../middlewares/onlyAdmin');


router.post('/:id', userAndAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(400).json({ message: 'Item not found' });
    }

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

    // Check stock
    if (item.stock < quantity) {
      return res.status(400).json({ message: 'Not enough stock for the item' });
    }

    // Calculate the total price
    const totalPrice = item.price * quantity;

    // Retrieve users with the same email address
    console.log(req.user)
    const usersWithSameEmail = await User.findAll({
      where: {
        email: req.user.email,
      },
    });

    // Apply discount based on the number of users with the same email
    let discountPercentage = 0;
    const usersCount = usersWithSameEmail.length;

    if (usersCount >= 2 && usersCount <= 4) {
      if (usersCount === 2) {
        discountPercentage = 10;
      } else if (usersCount === 3) {
        discountPercentage = 30;
      } else {
        discountPercentage = 40;
      }
    }

    // Apply discount to the total price
    const discountedPrice = totalPrice - (totalPrice * discountPercentage) / 100;

    const order = await Order.create({
      userId: req.user.id,
      status: status || 'In Process',
      total: discountedPrice, 
    });

    const orderItem = await OrderItem.create({
      orderId: order.id,
      itemId: id,
      price: item.price,
      quantity,
    });

    // Update the stock
    item.stock -= quantity;
    await item.save();

    // Clear the item from the cart
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

    const orderStatus = ['In Process', 'Complete', 'Cancelled'];
    if (!orderStatus.includes(status)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }

    order.status = status;
    await order.save();

    return res.json(order);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

module.exports = router;