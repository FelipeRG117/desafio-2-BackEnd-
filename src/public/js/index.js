const socket = io()

socket.emit("hola", "hola server")

//por parametros recibimos la data que enviamos desde el server y la manipulamos 
socket.on("productos", (data)=>{
    renderProductos(data)

})

//Funcion para renderizar nuestros productos

const renderProductos = (productos)=>{
    const contenedorProductos = document.getElementById("contenedorProductos")
    contenedorProductos.innerHTML = "";

    productos.forEach(item =>{
        //no se te olvide que ocupas accaeder al documento para crear un 
        //elemento    :/   DIOS MIO JAMAS TE OLVIDES

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
        <p>${item.title}</p>
        <p>${item.description}</p>
        <p>${item.code}</p>
       <button> Eliminar </button>
        `;

        contenedorProductos.appendChild(card)
        //agregar el evento al boton de eliminir
        card.querySelector("button").addEventListener("click", ()=>{
            eliminarProducto(item.id)

        })

    })


}

const eliminarProducto = (id)=>{
    socket.emit("eliminarProducto", id)
}

//La funcion de formulario se hace como una funcion aparte 
/* //porque? por que ¿ productos se encarga de traer todos los productos
en tiempo real que es una escucha con el server(app)

en la app gestionamos el emit eliminar productos aunque este dentro de una funcion
que quiere decir esto? que nosotros para poder manejar el formulario 
que es recuperar valores ya hacer las funciones con el product manager 
de acuerdo a los valores recuperados 

entonces creamos una funcion formulario para poder getsionar el dom y eventos 
con esos datos y la unicm diferencia de tiempo y real y no 
es de que usamos funciones emit para poder hacer llegar al server lo que sucedio 
y el server se encarga de guardar todas la funciones echas para 
interactuiar con el formulrio 
 */

/* con el product manager ya tenemos la funcion para gregar productos, entonces
nuestar tare aes recopilar todos los datos de auerredo a nuestro 
product manager y envuiarlos como objeto ya que desde add product 
tenemos para recibir un objeto por parametros 
entonces solo hay que enviar los datos recopilados del dom 
emitirlos y actualizarlo con emit 


SANTA MADRE DE DIOS, ESSSSSSSS DURO DURO PERO SSSSS CUANTA LOGICA Y APRENDIZAJE*/

//Pimreo que nada y que no se olvide reamos la funcion
/* pri cipal que es darle la funcion al boton de enviar del 
formulario, como se hcae esto? pues de manera global por que al f
final es independiente de los productos que renderizamos 
aqu estamos obteniendo valores de formulario 
y enviaandolos pra agregar y renderizar, auqneu parecidos 
pertenecen a dos funciones completamente distitas 

traemos el id del dom globalmente ya que es un metodo independiente 
del renderizado y de los otros metodos emit 
aunque se complementan son diferentes 

traemos directamente del docmmento y le hacemos un add event 
listener puro, y le agregamos el metodo de agregar producto 

que obtiene los valores del formulario 
y lanza un emit al sevridor para que se le envie un 
ovbjeto con todos los valores pedidos y requeridos para la funcion
add prduct de nuedsotr product manager */

document.getElementById("envio").addEventListener("click", ()=>{
//se le pone que audno hse haga click se ejecute x evento
agregarProducto()

})



const agregarProducto = ()=>{
    //creamos un objeto de acuerdo a los valores obtenidos del formulario 
const producto = {
    //los formamos por clave valor ya que un objeto se basa en clave valor 
   title: document.getElementById("title").value,
   description: document.getElementById("description").value,
   price: document.getElementById("price").value,
   img: document.getElementById("img").value,
   code: document.getElementById("code").value,
   stock: document.getElementById("stock").value,
   category: document.getElementById("category").value,
}
//se puede concatenar u emit dentro de una funcion
socket.emit("agregarProducto", producto)

}


