module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
      itemId: DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL
    }, {});
  
    OrderItem.associate = function(models) {
      OrderItem.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order', onDelete: 'CASCADE' });
      OrderItem.belongsTo(models.Item, { foreignKey: 'itemId', as: 'item' });
    };
  
    return OrderItem;
  };