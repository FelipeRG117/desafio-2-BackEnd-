const express = require("express")
const app = express()
const exphbs = require("express-handlebars")//impórtacion de modulo handlebars
const PUERTO = 8080;
const socket = require("socket.io")//importamos modulo socket.io

//descomentamos las lineas de product manager 
const ProductManager = require("../src/controllers/product-manager.js")
const productManager = new ProductManager("./src/models/productos.json")

//const CartManager = require("../src/controllers/carts-manager.js")
//const cartManager = new CartManager("./src/models/carrito.json")
app.use(express.json());
//Seccion de Routes Importacion y el use
const userRouter = require("./router/users.router.js");
const cartRouter = require("./router/cart.router.js")
const viewsRouter = require("./router/views.router.js") //traemos el  views de routs

//configuracion de rutas para los archivos router 
app.use("/api/products", userRouter);
app.use("/api/carts", cartRouter)
app.use("/views", viewsRouter)


//seteamos y configuramos hanldebars 
 //CAPETIÑA PUBLIC 
 app.use(express.static("./src/public"))
//configuramos handlears 
app.engine("handlebars", exphbs.engine())
//Aca seteamos el handlebars
app.set("view engine", "handlebars")
//Seteamos de nuevo 
app.set("views" , "./src/views");
//Aca le decimos donde se encuentran los archivos .handlebars 




const httpServer = app.listen(PUERTO)
const io = socket(httpServer)//creamos la constante io debajo de 
//nuestra escucha al server por que o si no no toma la referencia 



//creamosla conexion co el usuario io es nuestra instancia del servidor
io.on("connection",async (socket)=>{
try {
const productos = await productManager.getProducts()
//Enviamos el array al clientes, que es index/public 

socket.emit("productos", productos)

//recibimos el evento eliminar desde el cliente
socket.on("eliminarProducto", async (data)=>{
    const productoEliminar = await productManager.deleteProduct(data)

    //Debo enviarle la lista actualizada al cliente 
    io.sockets.emit("productos", await productManager.getProducts())
})

socket.on("agregarProducto", async (data)=>{

console.log(data)

//de la data ya recibimos el objeto con valores
const agregarProducto = await productManager.addProduct(data)
//Debo enviarle la lista actualizada al cliente 

//Se puede concatenar un emit dentro de otro emit

io.sockets.emit("productos", await productManager.getProducts())
})

 console.log("Un cliente se conecto")

} catch (error) {

    console.log("ocurrio un error", error);
}    

} )





