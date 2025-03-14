import { Router } from "express";
import {
  RegisterValidation,
  LoginValidation,
} from "../Middlewere/AuthValidations.ts";
import { login } from "../Controllers/AuthController.ts";
import { register } from "../Controllers/AuthController.ts";

const router = Router();

router.post("/register", RegisterValidation, register);
router.post("/login", LoginValidation, login);

export default router;
