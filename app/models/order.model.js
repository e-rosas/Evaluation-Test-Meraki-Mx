module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      date: {
        type: Sequelize.DATEONLY
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        },
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      }
    });

    Order.associate = function(models) {
      Order.belongsTo(models.Customer);
      Order.belongsTo(models.Product);
    }
  
    return Order;
  };