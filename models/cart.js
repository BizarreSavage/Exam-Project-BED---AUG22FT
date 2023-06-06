module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
      userId: DataTypes.INTEGER
    }, {});
  
    Cart.associate = function(models) {
      Cart.belongsTo(models.User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE'  });
      Cart.hasMany(models.CartItem, { foreignKey: 'cartId', as: 'cartItems', onDelete: 'CASCADE'  });
    };
  
    return Cart;
  };