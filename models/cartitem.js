module.exports = (sequelize, DataTypes) => {
    const CartItem = sequelize.define('CartItem', {
      itemId: DataTypes.INTEGER,
      cartId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL
    }, {});
  
    CartItem.associate = function(models) {
      CartItem.belongsTo(models.Cart, { foreignKey: 'cartId', as: 'cart' });
      CartItem.belongsTo(models.Item, { foreignKey: 'itemId', as: 'item' });
    };
  
    return CartItem;
  };