import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import router from "./routes/auth.js";


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const URL = process.env.CONNECTION_URL.replace(
  "<password>",
  process.env.PASSWORD
);

mongoose
  .connect(URL)
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("DB connection error:", err));

  app.use("/api",router);

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.listen(PORT, () => {
  console.log(`Server Connection ${PORT}`);
});
