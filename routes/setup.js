const axios = require('axios');
const express = require('express');
const router = express.Router();
const { Role, Item, User, Category } = require('../models');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  // Check if items table is empty
  const itemsCount = await Item.count();

  if (itemsCount > 0) {
    return res.status(400).json({ error: 'Database already populated.' });
  }

  // Fetch data from Noroff API
  try {
    const response = await axios.get('http://143.42.108.232:8888/items/stock');
    const data = response.data.data;

    // Create roles
    const adminRole = await Role.create({ name: 'Admin' });
    const userRole = await Role.create({ name: 'User' });

    // Create admin user
    const hashedPassword = await bcrypt.hash('P@ssword2023', 10);
    await User.create({ username: 'Admin', password: hashedPassword, email: 'admin@godmode.com', roleId: adminRole.id, firstname: 'admin', lastname: 'admin'});

    // Create categories and items
    const categorySet = new Set();
    const categoryMap = new Map();

    data.forEach(item => {
      categorySet.add(item.category);
    });

    for (let category of categorySet) {
      const newCategory = await Category.create({ name: category });
      categoryMap.set(category, newCategory.id);
    }

    for (let item of data) {
      await Item.create({ 
        name: item.item_name, 
        sku: item.sku, 
        price: item.price, 
        img_url: item.img_url, 
        categoryId: categoryMap.get(item.category),
        stock: item.stock_quantity
      });
    }

    return res.json({ message: "Database populated successfully." });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching data from Noroff API.' });
  }
});


module.exports = router;