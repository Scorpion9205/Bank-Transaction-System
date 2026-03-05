import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createTransaction } from "../controllers/transaction.controller.js";
const transactionRoutes = Router()



transactionRoutes.post("/",authMiddleware,createTransaction)

export default transactionRoutes