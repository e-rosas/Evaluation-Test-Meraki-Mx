module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "password",
    DB: "ecommerce",
    dialect: "mysql",
    //used for Sequelize ORM
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };