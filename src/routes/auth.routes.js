import { Router } from "express";
import { handleGetMe, handleLogin, handleRegister } from "../controllers/auth.controllers.js";
import { requireAuth } from "../middlewares/require-auth.js";

const authRoute=Router()

authRoute.post("/register", handleRegister)
authRoute.post("/login", handleLogin)
authRoute.get("/me", requireAuth, handleGetMe)

export {authRoute} 