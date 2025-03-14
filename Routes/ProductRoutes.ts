import { Router } from "express";
import isAuthenticated from "../Middlewere/Auth.ts";
const router = Router();

router.get("/", isAuthenticated, (req, res) => {
  res
    .status(200)
    .json(["name: 'Product 1', price: 100", "name: 'Product 2', price: 200"]);
});

export default router;