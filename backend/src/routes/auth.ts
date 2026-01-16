import {
  handleGetUserDetails,
  handleLogin,
  handleRegister,
} from "../controllers/auth.js";
import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.js";
export const router = Router();
router.post("/login", handleLogin);
router.post("register", handleRegister);
router.get("/get-user-details", isAuthenticated, handleGetUserDetails);
