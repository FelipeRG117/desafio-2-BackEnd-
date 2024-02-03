const express = require("express")
const app = express()

const PUERTO = 8080;

const ProductManager = require("../src/controllers/product-manager.js")
const productManager = new ProductManager("./src/models/productos.json")

const CartManager = require("../src/controllers/carts-manager.js")
const cartManager = new CartManager("./src/models/carrito.json")
app.use(express.json());

//Seccion de Routes Importacion y el use
const userRouter = require("./router/users.router.js");
const cartRouter = require("./router/cart.router.js")

app.use("/", userRouter);
app.use("/", cartRouter)






    

app.listen(PUERTO)







