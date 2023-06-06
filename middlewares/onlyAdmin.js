const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function onlyAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401); 
  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403); 
    
    const dbUser = await User.findOne({
      where: {
        username: user.username
      },
      include: 'role'
    });
    
    if (dbUser.role.name !== 'Admin') {
      return res.status(403).json({ message: 'Only admin has access to this page' });
    }
    
    req.user = dbUser;
    next(); 
  });
}

module.exports = onlyAdmin;