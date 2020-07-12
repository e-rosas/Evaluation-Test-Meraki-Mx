module.exports = app => {
    const customers = require("../controllers/customer.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Customer
    router.post("/", customers.create);
  
    // Retrieve all Customers
    router.get("/", customers.findAll);
  
    app.use('/api/customers', router);
  };