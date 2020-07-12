module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      }
    });

    Customer.associate = function(models) {
      Customer.hasMany(models.Order);
    }
  
    return Customer;
  };