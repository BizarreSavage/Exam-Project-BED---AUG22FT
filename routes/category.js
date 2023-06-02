const express = require('express');
const router = express.Router();
const { Category, Item } = require('../models');
const onlyAdmin = require('../middlewares/onlyAdmin');


router.post('/', onlyAdmin, async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    return res.json(category);
  } catch (err) {
    return res.status(400).json({ error: 'Error creating category' });
  }
});

router.put('/:id', onlyAdmin, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    await category.update({ name });
    return res.json(category);
  } catch (err) {
    return res.status(400).json({ error: 'Error updating category' });
  }
});

router.delete('/:id', onlyAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    const itemsInCategory = await Item.count({ where: { categoryId: id } });
    if (itemsInCategory > 0) {
      return res.status(400).json({ error: 'Cannot delete a category that contains items' });
    }
    await category.destroy();
    return res.json({ message: 'Category deleted' });
  } catch (err) {
    return res.status(400).json({ error: 'Error deleting category' });
  }
});

module.exports = router;