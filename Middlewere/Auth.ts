import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers["authorization"];
  if (!auth) {
    res.status(401).send("Invalid or Expired Token");
    return;
  }
  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body = decoded;
    next();
  } catch (error) {
    res.status(401).send("Invalid or Expired Token");
  }
};

export default isAuthenticated;
