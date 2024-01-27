const express = require("express")
const app = express()

const PUERTO = 8080;

const ProductManager = require("../src/controllers/product-manager.js")
const productManager = new ProductManager("./src/models/productos.json")
app.use(express.json());



app.get("/api/products", async (req,res)=>{
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

app.get("/api/products/:lid", (req, res)=>{
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

app.listen(PUERTO)







