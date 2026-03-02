import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

const transactionRoutes = Router()



transactionRoutes.post("/",authMiddleware,)

export default transactionRoutes