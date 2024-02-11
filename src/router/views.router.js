const express = require("express")
const router = express.Router()

const ProductManager = require("../controllers/product-manager.js")
const productManager = new ProductManager("./src/models/productos.json")


const arrayProductos = [
    {name: "señor Tortuga",
    category: "jefe de la banda",
    parjas: "un chingo"},
    {name: "Fede",
    category: "Tirador",
    parjas: "una amelia"},
    {name: "minnie",
    category: "captana",
    parjas: "una el señor tortuga"}
]

router.get("/views", async (req,res)=>{
try {
    const usuario = {
        name: "yomal",
        age: 20,
        padre: "undefined"
    }
    const productos = await productManager.getProducts()



    res.render("home", {titulo: "La vida loka", productos});
} catch (error) {
    console.log("ha ocurrido un error al actualizar", error);
    res.status(500).json({error: "Error interno del servidor"})
}

})

router.get("/realtimeproducts", async (req,res)=>{
try {
    res.render("realtimeproducts")
} catch (error) {
    console.log("ha ocurrido un error en real time", error )
    res.status(500).json({error: "Error interno del servidor"})
}

})




module.exports = router

