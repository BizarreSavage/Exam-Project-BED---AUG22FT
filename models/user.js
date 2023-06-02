module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      roleId: DataTypes.INTEGER
    }, {});
    User.associate = function(models) {
      User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
      User.hasOne(models.Cart, { foreignKey: 'userId', as: 'cart' });
      User.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
    };
    return User;
  };