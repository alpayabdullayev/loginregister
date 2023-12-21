import express from "express";
import { register, login, getAllUser } from "../controller/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user",auth,getAllUser)

export default router;