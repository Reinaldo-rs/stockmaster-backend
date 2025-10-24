import express from "express"
import dotenv from "dotenv"
import routes from "./routes/index.js"

dotenv.config()
const app = express()

//Middlewares
app.use(express.json())

// Rotas principais
app.use("/api", routes)

// Porta configurável
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})