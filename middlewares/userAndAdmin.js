const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function userAndAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    req.user = null; 
    return next(); 
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = decodedToken;
    
    const dbUser = await User.findOne({
      where: { username },
      include: ['role', 'cart'],
      attributes: ['id', 'username', 'email']
    });

    if (!dbUser) return res.sendStatus(403);

    req.user = {
      id: dbUser.id,
      username: dbUser.username,
      email: dbUser.email,
      roleId: dbUser.role.id, 
      cart: dbUser.cart 
    };

    next();
  } catch (error) {
    return res.sendStatus(403);
  }
}

module.exports = userAndAdmin;
