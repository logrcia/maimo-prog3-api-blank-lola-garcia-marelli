import express from "express";
const router = express.Router();
import Product from "../models/products.js";

const findAllProducts = async (req, res) => {
    try {
        const products = await Product.find().select("_id name categories description price image imageAlt color size print signed cover")
        res.status(200).send({message: "Todos los productos", products: products})
    } catch (error) {
        return res.status(501).send({message: "Hubo error ", error})
    }
};

const findOneProduct = async (req, res) => {
    const {id} = req.params
    try {
        const product = await Product.findOne({_id: id}).select("id name categories description price image imageAlt color size print signed cover")
        return res.status(200).send({message: "Producto encontrado ", product})
    } catch (error) {
        return res.status(501).send({message: "Hubo error ", error})
    }
}

const addProduct = async (req, res) => {
    const {type, name, categories, description, price, image, imageAlt, color, size, print, signed, cover} = req.body
    try {
        const product = new Product({type, name, categories, description, price, image, imageAlt, color, size, print, signed, cover})
        await product.save()
        return res.status(200).send({message: "Producto creado ", product})
    } catch (error) {
        return res.status(501).send({message: "Hubo error ", error})
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params
    try {
        const productToDelete = await Product.findOne({_id: id})

        if(!productToDelete){
            return res.status(404).send({message: "No existe el producto ", id: id})
        }

        await Product.deleteOne({_id: id})
        return res.status(200).send({message: "Producto borrado", product: productToDelete})
    } catch (error) {
        return res.status(501).send({message: "Hubo error ", error})
    }
}

const updateProduct = async (req, res) => {
    const {id} = req.params
    const {type, name, categories, description, price, image, imageAlt, color, size, print, signed, cover} = req.body
    try {
        const productToUpdate = await Product.findOne({_id: id})

        if(!productToUpdate){
            return res.status(404).send({message: "No existe el producto ", id: id})
        }

        //valores a actualizar
        //actualizar solo los campos que se enviaron
        if (type !== undefined) productToUpdate.type = type
        if (name !== undefined) productToUpdate.name = name
        if (categories !== undefined) productToUpdate.categories = categories
        if (description !== undefined) productToUpdate.description = description
        if (price !== undefined) productToUpdate.price = price
        if (image !== undefined) productToUpdate.image = image
        if (imageAlt !== undefined) productToUpdate.imageAlt = imageAlt
        if (color !== undefined) productToUpdate.color = color
        if (size !== undefined) productToUpdate.size = size
        if (print !== undefined) productToUpdate.print = print
        if (signed !== undefined) productToUpdate.signed = signed
        if (cover !== undefined) productToUpdate.cover = cover

        await productToUpdate.save()
        return res.status(200).send({message: "Producto actualizado", product: productToUpdate})
    } catch (error) {
        return res.status(501).send({message: "Hubo error ", error})
    }
}


//CRUD endpoints
router.get("/", findAllProducts);
router.get("/:id", findOneProduct);
router.post("/", addProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct)

export default router;
