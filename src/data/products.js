import fs from"fs";

let rutaProductos="./src/data/productos.json";


const productos = JSON.parse(fs.readFileSync(rutaProductos,{encoding:"utf-8"}));

console.log(productos)

    