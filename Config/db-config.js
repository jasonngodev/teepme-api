module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "1q2w3e",
    DB: "teepme",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };