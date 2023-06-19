const express = require('express');
const router = express.Router();
const { Cart, CartItem, Item } = require('../models');
const userAndAdmin = require('../middlewares/userAndAdmin');


// Add item to the user's cart
router.post('/', userAndAdmin, async (req, res) => {
  if (!req.user || !req.user.cart) {
    return res.status(401).json({ message: 'You need to be logged in to add items to your cart' });
  }

  const { itemId, quantity } = req.body;

  try {
    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(400).json({ message: 'This item does not exist, is there a typo in your request?' });
    }

    if (quantity > item.stock) {
      return res.status(400).json({ message: 'Not enough stock for this item' });
    }

    let cartItem = await CartItem.findOne({
      where: {
        cartId: req.user.cart.id,
        itemId,
      },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cartId: req.user.cart.id,
        itemId,
        price: item.price,
        quantity,
      });
    }

    return res.json(cartItem);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
  
  // Update quantity of an item in the cart
  router.put('/:id', userAndAdmin, async (req, res) => {

    if (!req.user || !req.user.cart) {
      return res.status(401).json({ message: 'You need to be logged in to do this' });
    }

    const { quantity } = req.body;
    try {
      const cartItem = await CartItem.findOne({
        where: { itemId: req.params.id, cartId: req.user.cart.id },
        include: { model: Item, as: 'item' },
      });
      if (!cartItem) {
        return res.status(400).json({ message: 'Cart item not found' });
      }
  
      if (quantity > cartItem.item.stock) {
        return res.status(400).json({ message: 'Not enough stock' });
      }
  
      cartItem.quantity = quantity;
      await cartItem.save();
  
      return res.json(cartItem);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  
  // Delete an item from the cart
  router.delete('/:id', userAndAdmin, async (req, res) => {

    if (!req.user || !req.user.cart) {
      return res.status(401).json({ message: 'You need to be logged in to do this' });
    }

    try {
      const cartItem = await CartItem.findOne({
        where: { itemId: req.params.id, cartId: req.user.cart.id },
      });
      if (!cartItem) {
        return res.status(400).json({ message: 'Cart item not found' });
      }
  
      await cartItem.destroy();
  
      return res.json({ message: 'Cart item deleted' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });
  
  module.exports = router;