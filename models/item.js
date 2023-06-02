module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define('Item', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      img_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
    },
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    }, {});
  
    Item.associate = function(models) {
      Item.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
      Item.hasMany(models.CartItem, { foreignKey: 'itemId', as: 'cartItems' });
      Item.hasMany(models.OrderItem, { foreignKey: 'itemId', as: 'orderItems' });
    };
  
    return Item;
  };