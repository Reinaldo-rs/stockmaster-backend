import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { userModel } from "../models/userModel.js"

dotenv.config()

export const AuthController = {
    async register(req, res) {
        try {
            const {name, email, password, role} = req.body

            const existing = await userModel.findByEmail(email)
            if(existing) return res.status(400).json({message: "Email já cadastrado."})
            
            const hashed = await bcrypt.hash(password, 10)
            const user = await userModel.create({name, email, password: hashed, role})

            res.status(201).json(user)
        } catch (error) {
            res.status(500).json({message: "Erro ao registrar usuário", error: error.message})
        }
    },

    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await userModel.findByEmail(email)
            if(!user) return res.status(404).json({message: "Usuário não encontrado."})
            
            const token = jwt.sign(
                {id: user.id, email: user.email, role: user.role},
                process.env.JWT_SECRET,
                {expiresIn: "2h"}
            )

            res.json({token})
        } catch (error) {
            res.status(500).json({message: "Erro ao fazer login", error:error.message})
        }
    },
}