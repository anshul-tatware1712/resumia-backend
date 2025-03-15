import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import UserModal from "../Modals/User.ts";
const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModal.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User already exists", success: false });
      return;
    }
    const userModal = new UserModal({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    const reposnse = await userModal.save();
    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModal.findOne({ email });
    if (!user) {
      res.status(403).json({
        message: "Auth failed Email or Password is wrong",
        success: false,
      });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(403).json({
        message: "Auth failed Email or Password is wrong",
        success: false,
      });
      return;
    }
    const jwtToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      message: "Auth Success",
      token: jwtToken,
      success: true,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export { register, login };
