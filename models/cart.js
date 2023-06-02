module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
      userId: DataTypes.INTEGER
    }, {});
  
    Cart.associate = function(models) {
      Cart.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      Cart.hasMany(models.CartItem, { foreignKey: 'cartId', as: 'cartItems' });
    };
  
    return Cart;
  };