import { ProductModel } from "../models/productModel.js"

export const ProductController = {
    async list(req, res) {
        try {
            const products = await ProductModel.getAll()
            res.json(products)
        } catch (error) {
            res.status(500).json({ message: "Erro ao listar produtos", error: error.message })
        }
    },

    async get(req, res) {
        try {
            const product = await ProductModel.getById(req.params.id)
            if (!product) return res.status(404).json({ message: "Produto não encontrado" })
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar produto", error: error.message })
        }
    },

    async create(req, res) {
        try {
            const newProduct = await ProductModel.create(req.body)
            res.status(201).json(newProduct)
        } catch (error) {
            res.status(500).json({message: "Erro ao criar produtos", error: error.message})
        }
    }
}