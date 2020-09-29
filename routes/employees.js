const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const validator = require("../validations/employeeValidation");
const validate = require("../middleware/validate");

router.get("/", async (req, res) => {
  const employees = await prisma.employees.findMany({
    include: { genders: true },
  });
  res.send(employees);
});

router.post("/", validate(validator), async (req, res) => {
  const { name, age, birthdate, genderId, fav_number } = req.body;

  const result = await prisma.employees.create({
    data: {
      name,
      age,
      birthdate: new Date(birthdate),
      genders: { connect: { id: genderId } },
      fav_number,
    },
  });

  res.send(result);
});

router.put("/:id", validate(validator), async (req, res) => {
  const { name, age, birthdate, genderId, fav_number } = req.body;
  //console.log(name, age, birthdate, genderId, fav_number);
  const id = req.params.id;
  const employee = await prisma.employees.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name,
      age,
      birthdate: new Date(birthdate),
      genders: { connect: { id: genderId } },
      fav_number,
    },
  });
  res.send(employee);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const employee = await prisma.employees.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.send(employee);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const employee = await prisma.employees.findOne({
    where: {
      id: parseInt(id),
    },
    include: {
      genders: true,
    },
  });
  res.send(employee);
});

module.exports = router;
