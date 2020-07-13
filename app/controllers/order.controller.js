const db = require("../models");
const Order = db.orders;
const Customer = db.customers;
const Product = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request, name must be set and price must be greater than 0
  if (!req.body.customerId) {
    res.status(400).send({
      message: "Customer can not be empty!",
    });
    return;
  } else if (!req.body.productId) {
    res.status(400).send({
      message: "Product can not be empty!",
    });
    return;
  } else if (!req.body.quantity || req.body.quantity <= 0) {
    res.status(400).send({
      message: "Quantity must be higher than 0!",
    });
    return;
  } else if (!req.body.total || req.body.total <= 0) {
    res.status(400).send({
      message: "Total must be higher than 0!",
    });
    return;
  }
  // Create a Order
  const order = {
    date: req.body.date,
    quantity: req.body.quantity,
    total: req.body.total,
    customerId: req.body.customerId,
    productId: req.body.productId,
  };
  // Save Order in the database
  Order.create(order)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the order.",
      });
    });
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  const productName = req.query.productName;
  const customerName = req.query.customerName;
  // FIlter orders by product name or customer name
  var productCondition = productName
    ? { name: { [Op.like]: `%${productName}%` } }
    : null;
  var customerCondition = customerName
    ? { name: { [Op.like]: `%${customerName}%` } }
    : null;
  // Eager load Customer and Product
  Order.findAll({
    include: [
      { model: Customer, as: "customer", attributes: ['name'], where: customerCondition },
      { model: Product, as: "product", attributes: ['name'], where: productCondition },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Order.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Order with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Order with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Order with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Order.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Orders were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all orders.",
      });
    });
};

