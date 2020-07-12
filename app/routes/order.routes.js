module.exports = app => {
    const order = require("../controllers/order.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Order
    router.post("/", order.create);
  
    // Retrieve all Orders
    router.get("/", order.findAll);
  
    app.use('/api/orders', router);
  };