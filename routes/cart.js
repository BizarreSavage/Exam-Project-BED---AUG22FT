const express = require('express');
const router = express.Router();
const { Cart, CartItem } = require('../models');
const userAndAdmin = require('../middlewares/userAndAdmin');

router.get('/', userAndAdmin, async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(400).json({ error: 'You must be logged in to see your cart' });
  }

  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.user.id,
      },
      include: 'cartItems',
    });
    return res.json(cart);
  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving cart' });
  }
});
  
router.delete('/:id', userAndAdmin, async (req, res) => {

  if (!req.user || !req.user.id) {
    return res.status(400).json({ error: 'You must be logged in to clear your cart' });
  }

  const cart = await Cart.findByPk(req.params.id);
  if (!cart || cart.userId !== req.user.id) {
    return res.status(400).json({ message: 'Cart not found' });
  }
  await CartItem.destroy({ where: { cartId: cart.id } });
  return res.json({ message: 'Cart cleared' });
});

module.exports = router;