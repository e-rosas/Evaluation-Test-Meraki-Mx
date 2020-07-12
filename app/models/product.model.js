module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
          },
      }
    });

    Product.associate = function(models) {
        Product.hasMany(models.Product);
      }
  
    return Product;
  };