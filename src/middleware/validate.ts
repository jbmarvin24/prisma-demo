import { Request, Response, NextFunction } from "express";

interface ErrorMessage {
  [key: string]: string[];
}

module.exports = function (validator: any): Response | any {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = validator(req.body);
    if (error) {
      let errors: ErrorMessage = {};

      for (let err = 0; err < error.details.length; err++) {
        const key: string = error.details[err].path[0];
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
