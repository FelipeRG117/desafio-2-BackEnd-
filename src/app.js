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

app.get("/api/products/:lid", async (req, res)=>{
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

app.post("/api/products", async (req, res)=>{
const nuevoProducto = req.body;

try {
    await productManager.addProduct(nuevoProducto)
    res.status(201).json({message: "producto agregado correctamente con post "})
} catch (error) {
    console.log("Hubo error en cerar un producto ", error );
    res.status(500).json({error: "Hubo un error al crear un producto post"})
}
})

app.put("/api/products/:pid", async (req, res)=>{
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

app.delete("/api/products/:delid", async (req,res)=>{
    let id = req.params.delid;
    try {
       await productManager.deleteProduct(parseInt(id))
    } catch (error) {
        console.log("Hubo error al tratar de borrar el producto", error);
        res.status(500).json({error: "Hubo un error al tratar de borrar el producto"})
    }

})


app.listen(PUERTO)







