import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) { return res.status(401).json({ message: "Token não fornecido" }) }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Token inválido" })
    }
}

export function adminOnly(req, res, next) {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Acesso negado" })
    next()
}