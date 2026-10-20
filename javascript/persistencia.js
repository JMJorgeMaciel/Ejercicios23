export function guardar(clave, valor){
    localStorage.setItem(clave, valor)
    return "Se guardo todo"
}

export function obtener(clave){
    return localStorage.getItem(clave)
}