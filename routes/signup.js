const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Cart } = require('../models');
require('dotenv').config();

router.post('/', async (req, res) => {
    const { username, password, email, firstname, lastname } = req.body;
  
    // Check if username, password, firstname, lastname and email are provided
    if (!username || !password || !email || !firstname || !lastname) {
      return res.status(400).json({ error: 'Username, password, firstname, lastname and email are required.' });
    }

    // Check if provided email is a real email address
    if(email){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
         return res.status(400).json({ error: 'Invalid email address' });
        }
    }
  
    // Check if username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists.' });
    }
  
    // Check the number of users registered with this email
    const usersWithSameEmail = await User.count({ where: { email } });
    if (usersWithSameEmail >= 4) {
      return res.status(400).json({ error: 'No more than 4 users can register with the same email.' });
    }
  
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create user
    const user = await User.create({ username, firstname, lastname, password: hashedPassword, email, roleId: 2 });

    // Create cart for the user
    const cart = await Cart.create({ userId: user.id });
    user.cartId = cart.id;
    await user.save();

  
    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
  
    return res.status(201).json({ message: 'Created new user successfully', token, user });
  });

  module.exports = router;