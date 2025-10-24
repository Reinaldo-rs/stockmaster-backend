import {db} from "../config/db.js"

export const userModel = {
    async create({name, email, password, role="user"}) {
        const [result] = await db.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, password, role]
        )
        return { id:result.insertId, name, email, role}
    },

    async findByEmail(email) {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email])
        return rows[0]
    },
}