//1er Desafio 
const fs = require("fs").promises;

class ProductManager {
    static id= 0;
    

    constructor(path){
        this.products = []
        this.path = path; 

    }
    
   
    
    async addProduct({title, description,price,img,code,stock, category, thumbnails}){
        try {
            const arrayProductos = await this.leerArchivo();
      
    if (!title || !description || !price || !img ||!code  ||!stock || !category) {
        console.log("Se necesitan todos los campos llenos");
        return; 
    }
    
    if (this.products.some(item=> item.code === code)) {
       console
       .log("El codigo es igual y se repite"); 
       return;
    }

    const newProduct ={
        id: ++ProductManager.id,
        title,
        description,
        price,
        img,
        code,
        stock, 
        category,
        status: true, 
        thumbnails: thumbnails || []
    }
    if (arrayProductos.length > 0) {
        ProductManager.ultId = arrayProductos.reduce((maxId, product) => Math.max(maxId, product.id), 0);
      }

      newProduct.id = ++ProductManager.ultId; 

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
    
    async getProductById(id){
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
       }
    }


    }

    module.exports = ProductManager;

























