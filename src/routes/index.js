import express from "express"
import { ProductController } from "../controllers/productController.js"
import {authMiddleware, adminOnly} from "../middleware/authMiddleware.js"
import authRoutes from "./authRoutes.js"

const router = express.Router()

router.use("/auth", authRoutes)

router.get("/products", ProductController.list)
router.get("/products/:id", ProductController.get)
router.post("/products", authMiddleware, adminOnly, ProductController.create)

export default router