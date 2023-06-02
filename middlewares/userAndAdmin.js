const jwt = require('jsonwebtoken');
const { User } = require('../models');

async function userAndAdmin(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { username } = decodedToken;
    
    const dbUser = await User.findOne({
      where: { username },
      include: ['role', 'cart']
    });

    if (!dbUser) return res.sendStatus(403);

    req.user = {
      id: dbUser.id,
      username: dbUser.username,
      roleId: dbUser.role.id, // Include the roleId for reference
      cart: dbUser.cart // Include the cart for reference
    };

    next();
  } catch (error) {
    return res.sendStatus(403);
  }
}

module.exports = userAndAdmin;