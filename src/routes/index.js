import express from "express"
import { ProductController } from "../controllers/productController.js"

const router = express.Router()

router.get("/products", ProductController.list)
router.get("/products/:id", ProductController.get)
router.post("/products", ProductController.create)

export default router