//importar medoto de persistencia "guardar" y "obtener"
import { guardar, obtener } from "./persistencia.js"
// busco un elemnto del html de un formulario mediante su selector y guardo en una variable
const formulario = document.querySelector("form")
// busco mi listado del ul por id
let listado = document.querySelector("#Listado-actividades")
// cada ves que hago click va ir subiendo la activiad de nuemero +1

// cacturar lo que se encuentra en el checkbox
const ingresarActividad = document.querySelector("input[name='actividad']")
const botonDeAccion = document.querySelector("button#accion")


let actividadNro = parseInt(obtener("nro-actividad") ) ?? 1
listado.innerHTML = obtener("actividades")
//añado un escuchador de evento con el metodo addEventListener
//permite añadir un escuchador de evento. cual va ser el tipo de "evento" ej click,
//cuando pasas el mouse por encima cuanto esta entrando saliendo etc.
formulario.addEventListener(
// una ves que escucho el tipo de evento yo puedo llamar una funcion que se va estar ejecutando
// tipo de evento que voy a escuchar submit.  
// el metodo addEventLIstener recibe 2 parametro 
// 1 tipo de evento sudmit
// 2 funcion que quiero que se ejecute
// le coloco un parametro que se llama evento
// Agregar
"submit", function (evento) {
 evento.preventDefault()
 console.log("Nombre: ",evento)
 //acceder al atrivuto value
 console.log("Valor del value: ",evento.target[0].value);
// el formulario no tiene nada en el controlado(dentro del atributo action)
// evitar el evento por defecto con preventDefault
// guardo en una variable y mostrar en consola el valor de value

// vuelvo a guardar en una variable lo que obtube del sumbmit
const actividad = evento.target.querySelector("input[name='actividad']").value
formulario.reset()
//const actividad = evento.target[0].value

// aumentar activiada por cada click en 1
// limpiar campo

console.log("Nombre: ",actividad);
if (botonDeAccion.dataset.accion === "actualizar"){
    //alert("Ahora vamos a actualizar el texto")
    const claseElemento = botonDeAccion.dataset.clase
    const itemBuscado = document.getElementById(claseElemento)?.closest("li")
    if (!itemBuscado){
        console.log("No se encuetra clase:", claseElemento) 
        return
    }
    itemBuscado.querySelector("label").textContent = actividad
    botonDeAccion.dataset.accion = "guardar"
    botonDeAccion.dataset.clase = ""
}else{
    actividadNro = actividadNro +1
const item = `<li class="flex justify-between actividad-${actividadNro}">
                    <div class = "texto">
                        <input type="checkbox" id="actividad-${actividadNro}"> 
                        
                        <label for="cantidad de actividad realizada-${actividadNro}">${actividad}</label> 
                        
                    </div>
                    <div class="acciones">
                        <button class=" editar border rounded-md border-white p-2 bg-slate-100 text-gray-900">Editar</button>
                        <button class="borrar border rounded-md border-white p-2 bg-red-600">Borrar</button>
                    </div>
                </li>` 
// colocar elemento li dentro del  UL        
listado.insertAdjacentHTML("beforeend", item) 
}

    guardar("actividades", listado.innerHTML)
    guardar("nro-actividad", actividadNro)
        
}
)

// al hacer click estoy enviando algo al formulario escuchar tambien cuando realizo algo
// tipo de evento click 
// al darle click en el boton borrar se elimine el elemento LI
// && doble ampersan se cumplan ambas condicion
// Borrar
listado.addEventListener(
    "click", function (evento) {
        const elemento = evento.target
        if(elemento.tagName == "BUTTON" && elemento.classList.contains("borrar")){
            //alert("Voy a borrar esta actividad")

            //elimino por que cumplio la condicion
            console.log(elemento.closest("li"), "¿Viste?");
            elemento.closest("li").remove()
        }
        
        // Editar
        if(elemento.tagName == "BUTTON" && elemento.classList.contains("editar")){
            let elementoPadre = elemento.closest("li").querySelector("label")
            let texto = elementoPadre.textContent
            //recuperar el valor - posicion para poder usar luego
            let posicion = elemento.closest("li").querySelector("input").id
            ingresarActividad.value = texto
            //mandar lo que se encuentra wl el checkbox al form imput
            // quiero cambiar la propiedad de guardar a autualizar
            botonDeAccion.setAttribute("data-accion", "actualizar")
            botonDeAccion.setAttribute("data-clase", posicion)
        }
        if(elemento.tagName === "LABEL" || elemento.tagName === "INPUT"){

            const item = elemento.closest("div.texto") 
            item .querySelector("label").className = "line-through"
            item .querySelector("input").setAttribute("disabled", true)
            
        }
    }
)

