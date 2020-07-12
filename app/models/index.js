const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customers = require("./customer.model.js")(sequelize, Sequelize);
db.products = require("./product.model.js")(sequelize, Sequelize);
db.orders = require("./order.model.js")(sequelize, Sequelize);

// A customer may have many orders
db.customers.hasMany(db.orders, { as: 'orders'});
// An order belongs to a customer
db.orders.belongsTo(db.customers, {
    foreignKey: "customerId",
    as: "customer",
  });
// A product may be on many orders
db.products.hasMany(db.orders, { as: 'orders'});
// An order has one product
db.orders.belongsTo(db.products, {
    foreignKey: "productId",
    as: "product",
});

module.exports = db;