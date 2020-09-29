const express = require("express");
const employess = require("../routes/employees");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/employees", employess);
};
