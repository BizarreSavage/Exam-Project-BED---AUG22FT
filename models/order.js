module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      userId: DataTypes.INTEGER,
      status: DataTypes.STRING,
      totalPrice: DataTypes.DECIMAL
    }, {});
  
    Order.associate = function(models) {
      Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
      Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'orderItems' });
    };
  
    return Order;
  };