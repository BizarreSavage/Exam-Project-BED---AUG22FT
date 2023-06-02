const express = require('express');
const router = express.Router();
const { Item, Category } = require('../models');
const onlyAdmin = require('../middlewares/onlyAdmin');

  
  router.post('/', onlyAdmin, async (req, res) => {
    const { name, sku, price, img_url, categoryId, stock } = req.body;
    try {
      const newItem = await Item.create({ name, sku, price, img_url, categoryId, stock });
      const responseMessage = 
      `- Name: ${name} - SKU: ${sku} - Price: ${price} - Image URL: ${img_url} - Category ID: ${categoryId} - Stock: ${stock}`

    return res.json(newItem);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
  
  router.put('/:id', onlyAdmin, async (req, res) => {
    const id = req.params.id;
    const { name, sku, price, img_url, categoryId, stock } = req.body;
    const item = await Item.findByPk(id);
    
    if (!item) {
      return res.status(400).json({ error: 'Item not found' });
    }
  
    item.name = name;
    item.sku = sku;
    item.price = price;
    item.img_url = img_url;
    item.categoryId = categoryId;
    item.stock = stock;
  
    await item.save();
  
    return res.json(item);
  });
  
  router.delete('/:id', onlyAdmin, async (req, res) => {
    const id = req.params.id;
    const item = await Item.findByPk(id);
    
    if (!item) {
      return res.status(400).json({ error: 'Item not found' });
    }
    
    await item.destroy();
  
    return res.json({ message: 'Item deleted' });
  });
  
  module.exports = router;