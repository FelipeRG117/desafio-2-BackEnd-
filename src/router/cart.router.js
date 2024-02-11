const express = require("express")
const router = express.Router()
const CartManager = require("../controllers/carts-manager")
const cartManager = new CartManager("./src/models/carrito.json")

//Ahora los metodos de carrito 
router.post("/", async (req, res)=>{
    const carrito = req.body;
    try {
        await cartManager.addProduct(carrito)
    } catch (error) {
        console.log("ha habido un error al agregar el carrito");
        res.status(500).json("Hubo un error al agregar carrito")
    }
})

router.get("/:cid", async (req, res)=>{
    try {
        let id = req.params.cid //accedemos al id de url
       const carr = await cartManager.getCartById(parseInt(id)) //lo traemos y lo parseamos pq el se recibe como string
       if (carr) {//si carr es verdadero se envia como mensje del serv
        res.json(carr)
       } else {//si no se envia mensjae de error
        res.json("No se encontro ningun carrito con ese id")
       }
        
    } catch (error) {
        console.log("Hubo un error al traer el carrito");
        res.status(500).json("Hubo un error al traer el carruito")
    }
})

router.post("/:cid/product/:pid", async (req,res)=>{
    let idCar = req.params.cid;//se toman los id de carrito y producto
    let id = req.params.pid;
    try {
        const producto = await cartManager.addProductCart(parseInt(idCar), parseInt(id))
        if (producto) {
            res.json(producto)
        } else {
            console.log("Se produjo un error al pushear un producto a arr");
        }
        
    } catch (error) {
        res.status(500).json("Salio que es false")
    }
})




    //Expotacion de router 
module.exports = router 






