const express = require("express")
const router = express.Router()
const ProductManager = require("../controllers/product-manager")
const productManager = new ProductManager("./src/models/productos.json")

router.get("/", async (req,res)=>{
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts()
        if (limit) {
            res.json(products.slice(0, limit))
        } else {
            res.json(products)
        }
    
    } catch (error) {
        console.log("Hubo un error al traer los productos");
        res.status(500).json({ error: "Hubo un error en encontrar productos" })
    }
    })
    
    router.get("/:lid", async (req, res)=>{
        const id = req.params.lid
        try {
            const producto = await productManager.getProductById(parseInt(id))
            if (producto) {
                res.json(producto)
            } else {
                res.json({error: "El producto no se encontro"})
            }
        } catch (error) {
            console.log("Hubo un error al traer por ID");
            res.status(500).json({ error: "Hubo un error en encontrar el producto" })
        }
    })
    
    router.post("/", async (req, res)=>{
    const nuevoProducto = req.body;
    
    try {
        await productManager.addProduct(nuevoProducto)
        res.status(201).json({message: "producto agregado correctamente con post "})
    } catch (error) {
        console.log("Hubo error en cerar un producto ", error );
        res.status(500).json({error: "Hubo un error al crear un producto post"})
    }
    })
    
    router.put("/:pid", async (req, res)=>{
        let id = req.params.pid;
        const productoActualizado = req.body;
    
        try {
            await productManager.updateProduct(parseInt(id), productoActualizado)
            res.json({message: "Producto actualizado sin problemas"})
            
        }catch (error) {
            console.log("Hubo error en actualizar un producto ", error);
            res.status(500).json({error: "Hubo un error al actualizar el producto put"})
        }
    
    })
    
    router.delete("/:delid", async (req,res)=>{
        let id = req.params.delid;
        try {
           await productManager.deleteProduct(parseInt(id))
        } catch (error) {
            console.log("Hubo error al tratar de borrar el producto", error);
            res.status(500).json({error: "Hubo un error al tratar de borrar el producto"})
        }
    
    })

        //Expotacion de router 
        module.exports = router 