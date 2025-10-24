import { db } from "../config/db.js"

export const ProductModel = {
    async getAll() {
        const [rows] = await db.query("SELECT * FROM products")
        return rows
    },

    async getById(id) {
        const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id])
        return rows[0]
    },

    async create(data) {
        const { name, description, price, quantity } = data
        const [result] = await db.query(
            "INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)",
            [name, description, price, quantity]
        )
        return { id: result.insertId, ...data }
    }
}