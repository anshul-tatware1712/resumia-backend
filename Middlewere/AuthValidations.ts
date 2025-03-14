import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const RegisterValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return; 
  }
  next();
};

const LoginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return; 
  }
  next();
};

export { RegisterValidation, LoginValidation };
