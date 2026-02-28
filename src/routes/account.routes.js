import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { createAccountController } from "../controllers/account.controller.js"
const router = express.Router()

// create a new account 
// it is a protected route means if user is logged in than only he can create account
router.post("/",authMiddleware,createAccountController)

export default router