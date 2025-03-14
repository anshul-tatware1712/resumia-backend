import express from "express";
import connectDB from "./Modals/db.ts";
import AuthRoutes from "./Routes/AuthRoutes.ts";
import ProductRoutes from "./Routes/ProductRoutes.ts";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
import * as dotenv from "dotenv";

dotenv.config();
connectDB();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", AuthRoutes);
app.use("/products", ProductRoutes);
app.get("/ping", (req, res) => {
  res.send("Pong");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
