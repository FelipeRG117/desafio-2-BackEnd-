//1er Desafio 
const fs = require("fs").promises;
//Modificar el product manager para manejar los carritos 

class CartManager {
    static id= 0;
    

    constructor(path){
        this.carts = []
        this.path = path; 

    }
    
   
    
    async addProduct({ arr}){
        try {
            const arrayProductos = await this.leerArchivo();
                 
    if (!arr) {
        console.log("Se necesitan todos los campos llenos");
        return; 
    }
    
    if (arrayProductos.some(item => item.id === CartManager.id)) {
       console
       .log("El id es igual y se repite"); 
       return;
    }

    const newProduct ={
        arr:  []
    }
    if (arrayProductos.length > 0) {
       CartManager.id = arrayProductos.reduce((maxId, product) => Math.max(maxId, product.id), 0);
      }

      newProduct.id = ++CartManager.id; 

      arrayProductos.push(newProduct);
      await this.guardarArchivo(arrayProductos);
    } catch (error) {
      console.log("Error al agregar producto", error);
      throw error; 
    }
    }
    
    async getProducts(){
      try {
        const productos = await this.leerArchivo()
        return productos;

      } catch (error) {
        console.log("Ha habido un problema al traer los productos", error);
      }

    }
    //Traerte carrito por id 

    async getCartById(id){
     try {
        const arrayProductos = await this.leerArchivo()
        const buscado =  arrayProductos.find(item => item.id === id) 
        if (buscado) {
            return buscado 
        } else {
            console.log("No se encontro el producto con el id, segui intentando");
        }  

     } catch (error) {
        console.log("hubo un error en traer el id ", error );
     }
    }
    //metodos desafio 2 


    async leerArchivo(){
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;   

        } catch (error) {
            console.log("error al leer al archivo", error);
        }

    }
    async guardarArchivo (arrayProductos){
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2))
        } catch (error) {
            console.log("Hubo un error al guardar", error );
            throw error;
        }

    }

    async deleteProduct (deleteID){
        try {
            const archivo = await this.leerArchivo()
            const producto = archivo.findIndex(product => product.id === deleteID)
            if (producto !== -1) {
                archivo.splice(producto, 1)
                await this.guardarArchivo(archivo)
                console.log("Se a borrado con exito el producto");
            } else {
                console.log("Ha habido un error al tratar de borrar");
            }
        } catch (error) {
            console.log("Ha habido un error al borrar producto");
        }

    }


    async updateProduct (id, updateBody){
       try {
        const archivo = await this.leerArchivo()
        const producto = archivo.findIndex(product => product.id === id)
        if (producto !== -1) {
            archivo[producto] = {...archivo[producto], ...updateBody} 
            await this.guardarArchivo(archivo)
            console.log("El producto se ha actualizado sin problemas");

        } else {
            console.log("a habido un error al actualizar");
        }

       } catch (error) {
        console.log("Ha habido un error al actualizar producto ", error);
        throw error; 
       }
    }



    //Metodo para crear productos e el is del carrito indicado 

    async addProductCart(cid, pid){
        try {
            //primero leer el json para ver que tenemos 
           const carritos = await this.leerArchivo()//se asignan los valores a la variable 
            //se hace la comprobacion si el cid existe o no
           const carrito = carritos.find(carr => carr.id === cid)
            if (carrito) {//si coincide se crea nuevo producto
              const product = carrito.arr.find(prod => prod.id === pid)
              if (product) {
                //si si existe se aumenta el quantity
                product.quantity++

              } else {
                //si no coinciden se crea un nuevo producto 
                const newProduct = {
                    id: pid,//sele da el valor de id ya que no existe ese producto con id
                    quantity: 1  //se inicaliza el quantity con 1 
                }
                carrito.arr.push(newProduct)
              }
              await this.guardarArchivo(carritos)
              return carrito
            } else {
                console.log("No existe el carrito");
                return null
            }
                
            }catch (error) {
            console.log("Hubo un error ala agregar producto a carrito", error);
           
        }
    }



    }

    






    module.exports = CartManager;

























