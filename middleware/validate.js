module.exports = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) {
      let errors = {};

      for (let err = 0; err < error.details.length; err++) {
        const key = error.details[err].path[0];
        const message = error.details[err].message
          .replace(key, key + " field")
          .replace(/['"]+/g, "");
        if (errors[key]) {
          errors[key].push(message);
        } else {
          errors[key] = [message];
        }
      }

      return res.status(400).send({
        message: "Validation failed.",
        errors,
      });
    }
    next();
  };
};
