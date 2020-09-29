import Joi from "joi";

module.exports = function (employee: Employee): Employee | any {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required().label("Name"),
    age: Joi.number().integer().positive().max(100).required().label("Age"),
    birthdate: Joi.date().required().label("Birthdate"),
    genderId: Joi.number().integer().required().label("Gender"),
    fav_number: Joi.number().integer(),
  });

  return schema.validate(employee, {
    abortEarly: false,
  });
};
